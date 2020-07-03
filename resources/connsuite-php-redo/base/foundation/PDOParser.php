<?php

/**
 * Create by @VanSoftware
 * Date: 09/06/2018
 * Time: 17:26
 */
trait PDOParser
{
    /**
     * @param PDO $conn
     * @param String $statement
     * @param null | array $values : Optional params. If valid, we need to bind them first.
     * @return null | object : The object returned from the query.
     */
    public static function parseSingleObject($conn,$statement, $values = null){
        $O = $conn->prepare($statement);
        if($values && count($values) > 0)
            foreach ($values as $value) {
                if(count($value) == 2) $O->bindValue($value[0],$value[1], $value[2]);
                else $O->bindValue($value[0],$value[1]);
            }

        if(!$O -> execute()) return null; //BRANCH : Execution failed.
        return $O->fetch(PDO::FETCH_ASSOC);//BRANCH : Returning the single/first object fetched.
    }

    /**
     * @param PDO $conn
     * @param String $statement
     * @param null | array $values : Optional params. If valid, we need to bind them first.
     * @return null | array : The array of objects returned from the query.
     */
    public static function parseArray($conn,$statement, $values = null){
        $O = $conn->prepare($statement);
        if($values && $values != null && count($values) > 0) foreach ($values as $value) {
            if(count($value) == 2) $O->bindValue($value[0],$value[1], $value[2]);
            else $O->bindValue($value[0],$value[1]);
        }
        if(!$O -> execute()) return null; //BRANCH : Execution failed.
        if($O->rowCount() > 0) return $O->fetchAll(PDO::FETCH_ASSOC);  //BRANCH : Return full array

        return null;  //BRANCH : 0 Results.
    }


    /**
     * @param PDO $conn
     * @param String $statement
     * @param null | array $values : Optional params. If valid, we need to bind them first.
     * @return bool : For MySQL instructions such as UPDATE, INSERT, DELETE, we check if the action was successful or not
     */
    public static function parseBoolean($conn,$statement,$values = null){
        $O = $conn->prepare($statement);
        if($values && $values != null && count($values) > 0) foreach ($values as $value) {
            if(count($value) == 2) $O->bindValue($value[0],$value[1], $value[2]);
            else $O->bindValue($value[0],$value[1]);
        }
        return $O->execute();//BRANCH : true / false as execution status
    }

    /**
     * @param PDO $conn
     * @param String $statement
     * @param null | array $values : Optional params. If valid, we need to bind them first.
     * @return bool : For MySQL instructions such as UPDATE, INSERT, DELETE, we check if the action was successful or not
     */
    public static function parseBooleanValidRows($conn,$statement,$values = null){
        if(!$conn) return null;
        $O = $conn->prepare($statement);
        if($values && count($values) > 0) foreach ($values as $value) {
            if(count($value) == 2) $O->bindValue($value[0],$value[1], $value[2]);
            else $O->bindValue($value[0],$value[1]);
        }
        if(!$O -> execute()) return null; //BRANCH : Execution failed.
        return ($O->rowCount() > 0); //BRANCH : true / false as existing number of rows is bigger than 0
    }

    /**
     * @param array $data
     * @param array $types
     * @return array
     */
    public static function buildValuesObject($data, $types){
        if($data === null || count($data) === 0 || $types === null || count($types) === 0) return array();
        try {
            $values = array();
            for ($i = 0; $i < count($data); $i++) {
                array_push($values,[$i+1,$data[$i], (count($types) > $i) ? $types[$i] : PDO::PARAM_STR ]);
            }
            return $values;
        }
        catch (Exception $e){return array();}
    }
}










