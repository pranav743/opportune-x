<?php


require 'vendor/autoload.php';
use MongoDB\BSON\Regex;


class InternshipController
{

    public function convertHyphensToSpaces($inputString)
    {
        $outputString = str_replace('-', ' ', $inputString);
        return $outputString;
    }

    public function searchInternshipsByTitle($request, $response, $args)
    {
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

    public function getInternshipById($request, $response, $args)
    {
        $internshipId = $args['id'];
        $db = getDatabase();
        $collection = $db->internships;

        try {
            $internship = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($internshipId)]);

            if ($internship) {
                http_response_code(200); // OK
                echo json_encode(["success" => true, 'message' => $internship]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["success" => false, 'message' => 'internship not found.']);
            }
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, 'message' => 'An error occurred while fetching the internship.']);
        }
    }

    public function applyForInternship($request, $response, $args)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $db = getDatabase();
            $internship_collection = $db->internships;
            $user_collection = $db->users;

            if (isset($data['user_id']) && isset($data['internship_id'])) {
                
                try {
                    $existingUser = $user_collection->findOne(['_id' => new MongoDB\BSON\ObjectId($data['user_id'])]);
                    $existingInternship = $internship_collection->findOne(['_id' => new MongoDB\BSON\ObjectId($data['internship_id'])]);
                } catch (Exception $e) {
                    http_response_code(404);
                    echo json_encode(["success" => false, 'message' => 'Invalid Internship or User', 'error'=> $e]);
                    return;
                }
            

                if ($existingUser && $existingInternship) {
                    $studentId = $data['user_id'];
                    $appliedStudents = iterator_to_array($existingInternship['appliedStudents']);

                    if (!in_array($studentId, $appliedStudents)) {
                        $appliedStudents[] = $studentId;

                        $internship_collection->updateOne(
                            ['_id' => new MongoDB\BSON\ObjectId($data['internship_id'])],
                            ['$set' => ['appliedStudents' => $appliedStudents]]
                        );
                    } else {
                        http_response_code(200);
                        echo json_encode(["success" => true, 'message' => 'Already Applied !']);
                        return;
                    }

                    if (!isset($existingUser['myInternshipApplications'])) {
                        $myInternshipApplications = [];
                    } else{
                        $myInternshipApplications = iterator_to_array($existingUser['myInternshipApplications']);
                    }
                    
                    $internshipId = $data['internship_id'];

                    if (!in_array($internshipId, $myInternshipApplications)) {
                        $myInternshipApplications[] = $internshipId;

                        $user_collection->updateOne(
                            ['_id' => new MongoDB\BSON\ObjectId($data['user_id'])],
                            ['$set' => ['myInternshipApplications' => $myInternshipApplications]]
                        );
                    }

                    http_response_code(200);
                    echo json_encode(["success" => true, 'message' => 'Student added to appliedStudents']);
                    return;
                } else {
                    http_response_code(404);
                    echo json_encode(["success" => false, 'message' => 'Invalid user or Internship']);
                    return;
                }


            } else {
                http_response_code(400);
                echo json_encode(["success" => false, 'message' => 'Invalid Data Provided']);
                return;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, 'message' => 'Something went Wrong']);
        }
    }

}