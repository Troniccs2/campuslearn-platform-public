import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "private_messages")
public class PrivateMessage {
    private String messageId;
    private Student student;
    private Tutor tutor;
    private Topic topic;
    private String content;
    private LocalDateTime timestamp = LocalDateTime.now();

    public PrivateMessage() {}

    public PrivateMessage(Student student, Tutor tutor, Topic topic, String content) {
    }

    public void attachMaterial(LearningMaterial material) {
    }

    public void readMessage() {
    }
}