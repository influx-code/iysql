from os import popen

def execute_commond_get_stdout(commond):
    r = popen(commond)
    lines = r.readlines()
    return ''.join(lines)