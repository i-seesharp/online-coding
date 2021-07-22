import java.util.*;
import java.lang.*;
import javafx.util.*;

public class TwoSum {
    public static void main(String[] args){
        int[][] test_cases;
        test_cases = generateTests(20);
        int n = test_cases.length;
        String result = "";
        for(int i=1;i<=n;i++){
            int[] supposed = twoSum(test_cases[i-1]);
            int[] actual = Solution.twoSum(test_cases[i-1]);
            if((supposed.length == 0 && actual==null) || Arrays.equals(supposed, actual)) result += ">> Test Case " + i + " Passed\n";
            else {
                result += ">> Test Case " + i + " Failed!\n\n";
                result += "Input : [";
                for(int j = 0;j < test_cases[i-1].length;j++) result += test_cases[i-1][j] + ",";
                result += "]";
                result += "\n";
                result += "Output : [";
                for(int j = 0;actual!=null && j < actual.length; j++) result += actual[j] + ",";
                result += "]";
                result += "\n";
                result += "Expected : [";
                for(int j=0;supposed!=null && j<supposed.length;j++) result += supposed[j] + ",";
                result += "]";
                result += "\n>>";
                break;
            }
        }
        System.out.println(result);
    }
    public static int[][] generateTests(int numTests) {
        int[][] tests = new int[numTests][];
        for(int i=0;i<numTests;i++){
            int len = (int)(Math.random()*100 + 1);
            int[] currentTest = new int[len];
            for(int index = 0;index < len; index++){
                currentTest[index] = (int)(Math.random()*5000 - 2500);
            }
            tests[i] = currentTest;
        }
        return tests;
    }
    public static int[] twoSum(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int left = 0, right = n-1;
        while(left < right){
            int sum = nums[left] + nums[right];
            if(sum == 0){
                int[] result = {left, right};
                Arrays.sort(result);
                return result;
            }else if(sum < 0) left++;
            else right--;
        }
        return new int[0];
    }
}