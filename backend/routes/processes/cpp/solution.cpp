#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
	/* Keep all helper functions added 'static' */
	static vector<int> two_sum(vector<int> &nums){
        sort(nums.begin(), nums.end());
        int left = 0, right = nums.size() - 1;
        int a = 0;
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
};