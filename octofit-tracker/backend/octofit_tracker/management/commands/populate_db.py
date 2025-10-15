from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (super heroes)
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password'),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password'),
        ]

        # Assign users to teams (assuming a team field exists on User, otherwise skip or adjust)
        # If not, you may need to create a Profile model or adjust this logic.

        # Create activities
        activities = [
            Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            Activity.objects.create(user=users[1], type='cycle', duration=45, distance=20),
            Activity.objects.create(user=users[2], type='swim', duration=60, distance=2),
            Activity.objects.create(user=users[3], type='run', duration=25, distance=4),
        ]

        # Create workouts
        workouts = [
            Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes'),
            Workout.objects.create(name='Strength Training', description='Strength for all heroes'),
        ]

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
