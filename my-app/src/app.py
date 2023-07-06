from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/scheduledjob', methods=['POST'])
def handle_api_request():
    data = request.get_json()
    print(data)

    # Process the received data
    table1 = data.get('Control')
    table2 = data.get('Severname')
    servers = data.get('Servers')
    time = data.get('Start_Time')
    interval = data.get('Interval')

    # Perform any necessary operations with the data

    # Create a response data dictionary
    response_data = {
        'message': 'API request received successfully',
        'table1': table1,
        'table2': table2,
        'servers': servers,
        'time': time,
        'interval': interval
    }
    
    print('Data received successfully via API request.')

    # Return the response data as JSON
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(port=5000)