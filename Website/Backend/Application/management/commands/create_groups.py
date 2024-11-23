from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Create user groups'

    def handle(self, *args, **kwargs):
        groups = ['normal_user', 'police', 'admin']

        for group_name in groups:
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Group "{group_name}" created'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Group "{group_name}" already exists'))

        self.stdout.write(self.style.SUCCESS('Groups setup complete'))
