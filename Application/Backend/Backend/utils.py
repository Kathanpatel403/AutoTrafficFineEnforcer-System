import socket

def get_local_ip():
    try:
        host_name = socket.gethostname()
        ip_address = socket.gethostbyname(host_name)
        return ip_address
    except Exception as e:
        print(f"An error occurred while getting local IP address: {e}")
        return None