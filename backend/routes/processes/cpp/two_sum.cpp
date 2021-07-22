#include <bits/stdc++.h>
#include "solution.cpp"

using namespace std;

vector<vector<int>> generate_tests(int num_tests) {
    vector<vector<int>> tests;
    for(int i = 0;i < num_tests;i++){
        vector<int> current_test;
        int len = rand() % 100 + 1;
        for(int index = 0;index < len; index++){
            current_test.push_back(rand()%5000 - 2500);
        }
        tests.push_back(current_test);
    }
    return tests;
}

vector<int> solve_two_sum(vector<int> nums) {
    sort(nums.begin(), nums.end());
    int left = 0, right = nums.size() - 1;
    while(left < right) {
        int sum = nums[left] + nums[right];
        if(sum == 0){
            vector<int> result = {left, right};
            sort(result.begin(), result.end());
            return result;
        }else if(sum < 0) left++;
        else right--;
    }
    return {};
}

int main() {
    vector<vector<int>> test_cases;
    test_cases = generate_tests(20);
    int n = test_cases.size();
    string result = "";
    for(int i=1;i<=n;i++){
        vector<int> supposed = solve_two_sum(test_cases[i-1]);
        vector<int> actual = Solution::two_sum(test_cases[i-1]);
        if(actual == supposed) result += ">> Test Case " + to_string(i) + " Passed\n";
        else {
            result += ">> Test Case " + to_string(i) + " Failed!\n\n";
            result += "Input : [";
            for(int j = 0;j < test_cases[i-1].size();j++) result += to_string(test_cases[i-1][j]) + ",";
            result += "]";
            result += "\n";
            result += "Output : [";
            for(int j = 0;j < actual.size(); j++) result += to_string(actual[j]) + ",";
            result += "]";
            result += "\n";
            result += "Expected : [";
            for(int j=0;j<supposed.size();j++) result += to_string(supposed[j]) + ",";
            result += "]";
            result += "\n>>";
            break;
        }
    }
    cout << result << "\n";
    return 0;
}