import java.util.HashMap;

/**
 * 1.两数之和
 * https://leetcode.cn/problems/two-sum/
 */
public class twoSum {

    public static void main(String[] args) {
        int[] nums = {2,7,11,15};
        int target = 9;
        int[] r = twoSum(nums, target);
        System.out.println(r[0] + "," + r[1]);
    }

    /**
     * map：key，补位数；value：index下标
     * 复杂度：O(n)
     */
    private static int[] twoSum(int[] nums, int target) {
        int[] ids = new int[2];
        HashMap<Integer, Integer> hash = new HashMap<Integer, Integer>();
        for (int i=0 ; i < nums.length ; i++) {
            if (hash.containsKey(nums[i])) {
                ids[0] = hash.get(nums[i]);
                ids[1] = i;
                return ids;
            }
            int key = target - nums[i];
            hash.put(key, i);
        }
        return ids;
    }
    
}
