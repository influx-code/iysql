from os import environ

soar_configs = {
    'execuable_path': environ.get('soar', 'soar'),
    'user': 'root',
    'password': '123456',
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'blog',
    'skills': {
    	"-report-type":{
    		"type" : 1,
    		"default" : "text"
    	},
        "-allow-online-as-test":{
            "type" : 1,
            "default": "true"
        },
        "-profiling":{
            "type" : 1,
            "default": "true"
        },
        # "-trace":{
        #     "type" : 1,
        #     "default": "true"
        # },
        "-verbose":{
            "type" : 1,
            "default": "true"
        }
    }
}