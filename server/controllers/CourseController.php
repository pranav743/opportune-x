<?php


    require __DIR__ . '/../vendor/autoload.php';
    
    use MongoDB\BSON\Regex;


class CourseController {

    public function getAllCourses() {
        $db = getDatabase();
        $collection = $db->courses;
        $cursor = $collection->find();
        $allDocuments = [];
        foreach ($cursor as $document) {
            $allDocuments[] = $document;
        }
        $json = json_encode($allDocuments, JSON_PRETTY_PRINT);
        echo $json;
    }

    public function getCoursesByCategory($request, $response, $args) {
        $category = $args['category'];
        $db = getDatabase();
        $collection = $db->courses;
    
        $filter = ['category' => $category];
    
        try {
            $cursor = $collection->find($filter);
    
            $filteredCourses = [];
            foreach ($cursor as $document) {
                $filteredCourses[] = $document;
            }
    
            if (empty($filteredCourses)) {
                http_response_code(404); // Bad Request
                echo json_encode(["success" => false, 'message' => 'Courses Not Found for this Category']);
                return;
            }
    
            http_response_code(201); // Bad Request
            echo json_encode(["success" => true, 'message' => $filteredCourses]);
        } catch (Exception $e) {
            // Handle any database query errors and return an error response.
            http_response_code(500); // Bad Request
            echo json_encode(["success" => false, 'message' => 'An Error Occurred']);
        }
    }

    public function convertHyphensToSpaces($inputString) {
        $outputString = str_replace('-', ' ', $inputString);
        return $outputString;
    }

    public function searchCoursesByTitle($request, $response, $args) {
        $search = $args['search'];
        $search = $this->convertHyphensToSpaces($search);
        $db = getDatabase();
        $collection = $db->courses;
    
        $regexPattern = new Regex($search, 'i');
        $filter = ['courseTitle' => ['$regex' => $regexPattern]];
    
        try {
            $cursor = $collection->find($filter, ['projection' => ['courseTitle' => 1]]);
    
            $matchingTitles = [];
            foreach ($cursor as $document) {
                $matchingTitles[] = $document['courseTitle'];
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

    public function getCourseById($request, $response, $args) {
        $courseId = $args['id']; // Assuming 'id' is the route parameter for the MongoDB ID
        $db = getDatabase();
        $collection = $db->courses;
    
        try {
            $course = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($courseId)]);
    
            if ($course) {
                http_response_code(200); // OK
                echo json_encode(["success" => true, 'message' => $course]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["success" => false, 'message' => 'Course not found.']);
            }
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, 'message' => 'An error occurred while fetching the course.']);
        }
    }
    
 
}