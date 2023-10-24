<?php
    // declare(strict_types=1);
    require __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../config.php';

    use Lcobucci\JWT\Encoding\ChainedFormatter;
    use Lcobucci\JWT\Encoding\JoseEncoder;
    use Lcobucci\JWT\Signer\Key\InMemory;
    use Lcobucci\JWT\Signer\Hmac\Sha256;
    use Lcobucci\JWT\Token\Builder;
    use Lcobucci\JWT\Parser;
    use Lcobucci\JWT\Encoding\CannotDecodeContent;
    use Lcobucci\JWT\Token\InvalidTokenStructure;
    use Lcobucci\JWT\Token\UnsupportedHeaderFound;
    use MongoDB\BSON\ObjectId;

    $tokenBuilder = (new Builder(new JoseEncoder(), ChainedFormatter::default()));
    $algorithm    = new Sha256();
    $signingKey   = InMemory::plainText(random_bytes(32));

class UserController {

    private $jwtSecret = JWT_SECRET;

    public function route1() {
        $db = getDatabase();
        $collection = $db->internships;
        $cursor = $collection->find();

        $allDocuments = [];
        foreach ($cursor as $document) {
            $allDocuments[] = $document;
        }
        $json = json_encode($allDocuments, JSON_PRETTY_PRINT);
        echo $json;
    }

    public function register() {

        $data = json_decode(file_get_contents('php://input'), true);
    

        if (isset($data['email']) && isset($data['password'])) {
            // Sanitizing and validate user input
            $email = htmlspecialchars($data['email']);
            $password = password_hash($data['password'], PASSWORD_BCRYPT);
    
            $db = getDatabase();
            $collection = $db->users;
    
            $existingUser = $collection->findOne(['email' => $email]);
    
            if ($existingUser) {
                http_response_code(400); // Bad Request
                echo json_encode(["success" => false, 'message' => 'User with this email already exists']);
            } else {
                // Prepare the user document
                $data['password']=$password;
                $data['isActive']= true;
                $userDocument = $data;
                // $userDocument = [
                //     'email' => $email,
                //     'password' => $password,
                // ];
    
                // Insert the user document into the "users" collection
                $result = $collection->insertOne($userDocument);
    
                if ($result->getInsertedCount() > 0) {
                    http_response_code(201); // Created
                    echo json_encode(["success" => true, 'message' => 'Registration successful']);
                } else {
                    http_response_code(500); // Internal Server Error
                    echo json_encode(["success" => false, 'message' => 'Registration failed']);
                }
            }
        } else {
            http_response_code(400); 
            echo json_encode(["success" => false, 'message' => 'Invalid Data Provided']);
        }
    }

    public function login() {
        // Retrieve user login data from the request
        $data = json_decode(file_get_contents('php://input'), true);

        // Basic validation (you should perform more extensive validation)
        if (isset($data['email']) && isset($data['password'])) {
            $email = htmlspecialchars($data['email']);
            $password = $data['password'];

            $db = getDatabase();
            $collection = $db->users;

            // Find the user by email
            $user = $collection->findOne(['email' => $email]);

            if ($user) {
                // Check if the provided password matches the stored hashed password
                if (password_verify($password, $user['password'])) {
                    // Generate a JWT token
                    $token = $this->generateJWT($user['_id']);

                    // Return the token in the response
                    http_response_code(200); // OK
                    echo json_encode(['success' => true, 'token' => $token]);
                } else {
                    http_response_code(401); // Unauthorized
                    echo json_encode(['success' => false, 'message' => 'Incorrect password']);
                }
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['success' => false, 'message' => 'User not found']);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'Invalid data']);
        }
    }

    private function generateJWT($userId) {
        $tokenBuilder = (new Builder(new JoseEncoder(), ChainedFormatter::default()));
        $algorithm    = new Sha256();
        $signingKey = InMemory::plainText($this->jwtSecret);
        $now   = new DateTimeImmutable();
        $token = $tokenBuilder
            // Configures the issuer (iss claim)
            // ->issuedBy('http://opportune.com')
            // Configures the audience (aud claim)
            // ->permittedFor('http://opportune.org')
            // Configures the id (jti claim)
            // ->identifiedBy('4f1g23a12aa')
            // Configures the time that the token was issue (iat claim)
            // ->issuedAt($now)
            // Configures the time that the token can be used (nbf claim)
            // ->canOnlyBeUsedAfter($now->modify('+0 minute'))
            // Configures the expiration time of the token (exp claim)
            ->expiresAt($now->modify('+1 hour'))
            // Configures a new claim, called "uid"
            ->withClaim('user_id', $userId)
            // Configures a new header, called "foo"
            // ->withHeader('foo', 'bar')
            // Builds a new token
            ->getToken($algorithm, $signingKey);

        return $token->toString();
    }

    private function decodeJWT($token1) {

        $parser = new Lcobucci\JWT\Token\Parser(new JoseEncoder());
        try {
            $token = $parser->parse($token1);
        } catch (CannotDecodeContent | InvalidTokenStructure | UnsupportedHeaderFound $e) {
            echo 'Error: ' . $e->getMessage();
        }
        // print_r($token->claims()->all());
        $userIdClaim = $token->claims()->get('user_id');
        if ($userIdClaim) {
            $userId = $userIdClaim['$oid'];
        }

        return $userId;
    }

    public function authorization() {
        // Retrieve user login data from the request
        $data = json_decode(file_get_contents('php://input'), true);

        // Basic validation (you should perform more extensive validation)
        if (isset($data['authorization'])) {
            $token = $data['authorization'];
            
            $user_id = $this->decodeJWT($token);
            $userObjectId = new ObjectId($user_id);
            $db = getDatabase();
            $collection = $db->users;

            // Find the user by email
            $user = $collection->findOne(['_id' => $userObjectId]);
              
            if ($user) {                
                http_response_code(201);
                // unset($user['_id']);
                unset($user['password']); 
                echo json_encode(['success' => true, 'message' => $user]);
                
            } else {
                http_response_code(404); 
                echo json_encode(['success' => false, 'message' => 'User not found']);
            }
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['success' => false, 'message' => 'Something Went Wrong']);
        }
    }

    public function updateProfile($request, $response, $args) {

        
        // $requestBody = $request->getBody();
        // $requestBodyContents = $requestBody->getContents();
        // print_r($requestBodyContents);

        $data = json_decode(file_get_contents('php://input'), true);
    

        if (isset($data['_id'])) {
            // Sanitizing and validate user input
            $userObjectId = new ObjectId($data['_id']);
    
            $db = getDatabase();
            $collection = $db->users;
    
            $existingUser = $collection->findOne(['_id' => $userObjectId]);
    
            if (!$existingUser) {
                http_response_code(400); // Bad Request
                echo json_encode(["success" => false, 'message' => 'Invalid Session']);
                exit;
            } else {
                
                
                unset($data['_id']);
                unset($data['email']);
                
                foreach ($data as $key => $value) {
                    $existingUser[$key] = $value;
                }
                $existingUser['updatedAt'] = new MongoDB\BSON\UTCDateTime();
                $filter = ['_id'=> $userObjectId];
                $update = ['$set'=> $existingUser];
                
                $result = $collection->updateOne($filter, $update);
            
    
                if ($result->getModifiedCount() > 0) {
                    http_response_code(201); // Created
                    echo json_encode(["success" => true, 'message' => 'Updated Profile']);
                    exit;
                } else {
                    http_response_code(500); // Internal Server Error
                    echo json_encode(["success" => false, 'message' => 'Profile cannot be updated']);
                    exit;
                }
            }
        } else {
            http_response_code(400); 
            echo json_encode(["success" => false, 'message' => 'Invalid Data Provided']);
        }
    }
    
    public function route2() {
        echo "Echo Route 2";
    }
    
}
