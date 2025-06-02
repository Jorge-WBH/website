import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Intro {
    public static void main(String[] args) {
        System.out.println("Welcome to the party!");
        try {
            File file = new File("introduction.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }
            String[] x = {"a","2"};
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}