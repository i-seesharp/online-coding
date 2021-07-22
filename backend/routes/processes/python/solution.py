class Solution:
	def two_sum(self, lst):

		nums = lst[:]
		nums = sorted(nums)
		
		left = 0
		right = len(nums)-1
		return []
		while(left < right):
		    sum = nums[left]+nums[right]
		    if(sum == 0):
		        print(sum)
		        result = [left, right]
		        result = sorted(result)
		        return result
		    elif(sum < 0):
		        left = left + 1
		    else:
		        right = right - 1
		return []