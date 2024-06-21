# mongodbapp/routers.py

class MongoDBRouter:
    """
    A router to control all database operations on models in the
    mongodbapp application.
    """
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'mongodbapp':
            return 'mongodb'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'mongodbapp':
            return 'mongodb'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'mongodbapp' or \
           obj2._meta.app_label == 'mongodbapp':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'mongodbapp':
            return db == 'mongodb'
        return None
