from solution import Solution
from random import randint

def generate_tests(num_tests):
    tests = []
    for i in range(num_tests):
        len = randint(0,100)
        current_test = []
        for i in range(len):
            value = randint(-2500,2500)
            current_test.append(value)
        tests.append(current_test)
    return tests

def two_sum(lst):
    nums = lst[:]
    nums = sorted(nums)
    left = 0
    right = len(nums) - 1
    while(left < right):
        sum = nums[left] + nums[right]
        if(sum == 0):
            res = [left, right]
            res = sorted(res)
            return res
        elif(sum < 0):
            left = left + 1
        else:
            right = right - 1
    return []

def main():
    tests = generate_tests(20)
    i = 0
    for test in tests:
        expected = two_sum(test)
        actual = Solution().two_sum(test)
        if(expected == actual):
            print(">> Test Case "+str(i+1)+" Passed")
        else:
            print(">> Test Case "+str(i+1)+" Failed!")
            print("Input : ")
            print(test)
            print("Output : ")
            print(actual)
            print("Expected : ")
            print(expected)
            break
        i = i + 1
    return 0

if __name__ == "__main__":
    main()
    


