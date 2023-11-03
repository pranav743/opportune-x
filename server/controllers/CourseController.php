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

    public function applyForCourse($request, $response, $args)
    {
        try {
            
            $data = json_decode(file_get_contents('php://input'), true);
            $db = getDatabase();
            $course_collection = $db->courses;
            $user_collection = $db->users;

            if (isset($data['user_id']) && isset($data['course_id'])) {

                try {
                    $existingUser = $user_collection->findOne(['_id' => new MongoDB\BSON\ObjectId($data['user_id'])]);
                    $existingCourse = $course_collection->findOne(['_id' => new MongoDB\BSON\ObjectId($data['course_id'])]);
                } catch (Exception $e) {
                    http_response_code(404);
                    echo json_encode(["success" => false, 'message' => 'Invalid Course or User', 'error' => $e]);
                    exit;
                }
                if ($existingUser && $existingCourse) {
                    $studentId = $data['user_id'];
                    $enrolledStudents = iterator_to_array($existingCourse['enrolledStudents']);
                    if (!in_array($studentId, $enrolledStudents)) {
                        $enrolledStudents[] = $studentId;
                        $course_collection->updateOne(
                            ['_id' => new MongoDB\BSON\ObjectId($data['course_id'])],
                            ['$set' => ['enrolledStudents' => $enrolledStudents]]
                        );
                    } else {
                        http_response_code(200);
                        echo json_encode(["success" => true, 'message' => 'Already Enrolled !']);
                        exit;
                    }
                    if (!isset($existingUser['myCourseEnrollments'])) {
                        $myCourseEnrollments = [];
                    } else {
                        $myCourseEnrollments = iterator_to_array($existingUser['myCourseEnrollments']);
                    }
                    $internshipId = $data['course_id'];
                    if (!in_array($internshipId, $myCourseEnrollments)) {
                        $myCourseEnrollments[] = $internshipId;

                        $user_collection->updateOne(
                            ['_id' => new MongoDB\BSON\ObjectId($data['user_id'])],
                            ['$set' => ['myCourseEnrollments' => $myCourseEnrollments]]
                        );
                    }
                    http_response_code(200);
                    echo json_encode(["success" => true, 'message' => 'Your Application has been Submitted !']);
                    exit;
                } else {
                    http_response_code(404);
                    echo json_encode(["success" => false, 'message' => 'Invalid user or Internship']);
                    exit;
                }
            } else {
                http_response_code(400);
                echo json_encode(["success" => false, 'message' => 'Invalid Data Provided']);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, 'message' => 'Something went Wrong', 'error' => $e]);
        }
    }
    
 
}