class Config:
    SECRET_KEY = '!@#nhudy7a)_(F%$'

class DevConfig(Config):
    HOST = '0.0.0.0'
    PORT = 5000
    DEBUG = True

class ProductionConfig(Config):
    HOST = '0.0.0.0'
    PORT = 8080
    DEBUG = False

configs = {
    'default': DevConfig,

    'dev': DevConfig,
    'production': ProductionConfig
}