import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

public class PostgresInsertExample {
    // Update with your DB connection info
    private static final String URL = "jdbc:postgresql://localhost:5432/campuslearn";
    private static final String USER = "postgres";
    private static final String PASSWORD = "PRG381PROJECT";

    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            // Load PostgreSQL driver
            Class.forName("org.postgresql.Driver");

            // Connect to database
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // SQL Insert statement
            String sql = "INSERT INTO notifications (recipient_id, channel, message, sent_at, delivered) " +
                         "VALUES (?, ?, ?, ?, ?)";

            pstmt = conn.prepareStatement(sql);

            // Set values
            pstmt.setInt(1, 2); // recipient_id
            pstmt.setString(2, "email"); // channel
            pstmt.setString(3, "Your topic got a new reply and it’s cool"); // message
            pstmt.setTimestamp(4, new Timestamp(System.currentTimeMillis())); // sent_at (current time)
            pstmt.setBoolean(5, false); // delivered

            // Execute insert
            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("A new notification was inserted successfully!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}
