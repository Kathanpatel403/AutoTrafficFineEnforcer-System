from djongo import models

class Profile(models.Model):
    details1 = models.CharField(max_length=255)
    details2 = models.CharField(max_length=255)

    class Meta:
        abstract = True

class MongoDBModel(models.Model):
    email = models.EmailField(unique=True)
    profiles = models.ArrayField(
        model_container=Profile  # Use the Profile model as model_container
    )

    def __str__(self):
        return self.email
