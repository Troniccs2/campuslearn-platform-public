import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class PostgresInsertExample {
    // Database connection details
    private static final String URL = "jdbc:postgresql://localhost:5432/campuslearn";
    private static final String USER = "campuslearn";
    private static final String PASSWORD = "PRG381PROJECT";

    public static void main(String[] args) {
        // SQL query
        String sql = "INSERT INTO notifications (recipient_id, channel, message) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set parameters
            pstmt.setInt(1, 2);
            pstmt.setString(2, "email");
            pstmt.setString(3, "Your topic got a new reply");

            // Execute insert
            int rowsAffected = pstmt.executeUpdate();

            System.out.println("Insert successful! Rows affected: " + rowsAffected);

            System.out.println("test run !");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
