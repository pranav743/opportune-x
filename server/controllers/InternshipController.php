<?php


    require 'vendor/autoload.php';
    use MongoDB\BSON\Regex;


class InternshipController {

    public function convertHyphensToSpaces($inputString) {
        $outputString = str_replace('-', ' ', $inputString);
        return $outputString;
    }

    public function searchInternshipsByTitle($request, $response, $args) {
        $search = $args['search'];
        $search = $this->convertHyphensToSpaces($search);
        $db = getDatabase();
        $collection = $db->internships;
    
        $regexPattern = new Regex($search, 'i');
        $filter = ['title' => ['$regex' => $regexPattern]];
    
        try {
            $cursor = $collection->find($filter, ['projection' => ['title' => 1]]);
    
            $matchingTitles = [];
            foreach ($cursor as $document) {
                $matchingTitles[] = $document['title'];
            }
    
            if (empty($matchingTitles)) {
                http_response_code(404); // Not Found
                echo json_encode(["success" => false, 'message' => 'No matching courses found.']);
                return;
            }
    
            http_response_code(200); // OK
            echo json_encode(["success" => true, 'message' => $matchingTitles]);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, 'message' => 'An error occurred while searching for courses.']);
        }
    }
}