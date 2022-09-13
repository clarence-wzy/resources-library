import util.ListNode;

/**
 * 2. 两数相加
 * https://leetcode.cn/problems/add-two-numbers/
 */
public class addTwoNumbers {

    public static void main(String[] args) {
        // l1 = [2,4,3], l2 = [5,6,4]
        ListNode firstNode, secondNode, thirdNode;
        
        ListNode l1 = new ListNode(0);
        firstNode = new ListNode(2);
        secondNode = new ListNode(4);
        thirdNode = new ListNode(3);
        secondNode.next = thirdNode;
        firstNode.next = secondNode;
        l1.next = firstNode;

        ListNode l2 = new ListNode(0);
        firstNode = new ListNode(5);
        secondNode = new ListNode(6);
        thirdNode = new ListNode(4);
        secondNode.next = thirdNode;
        firstNode.next = secondNode;
        l2.next = firstNode;

        ListNode rtListNode = addTwoNumbers(l1, l2);
        System.out.println(rtListNode.next.val + "," + rtListNode.next.next.val + "," + rtListNode.next.next.next.val);
    }
    
    private static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode listNode = new ListNode(0);
        
        
        
        return listNode;
    }
    
}
