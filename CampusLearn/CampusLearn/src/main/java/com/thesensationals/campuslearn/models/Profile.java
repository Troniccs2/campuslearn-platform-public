import javax.persistence.*;

@Embeddable
public class Profile {
    private String bio;
    private String academicBackground;
    private String contactPreferences;

    public Profile() {}

    public Profile(String bio, String academicBackground, String contactPreferences) {
    }

    public void updateProfileDetails(String bio, String academicBackground) {
    }
}