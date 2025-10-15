from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Workout, Leaderboard

User = get_user_model()

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team")
        self.assertEqual(team.name, "Test Team")

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="pass")
    def test_create_activity(self):
        activity = Activity.objects.create(user=self.user, type="run", duration=30, distance=5.0)
        self.assertEqual(activity.type, "run")

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Pushups", description="Do 20 pushups")
        self.assertEqual(workout.name, "Pushups")

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name="Leaderboard Team")
    def test_create_leaderboard(self):
        leaderboard = Leaderboard.objects.create(team=self.team, points=100)
        self.assertEqual(leaderboard.points, 100)
