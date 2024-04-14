from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=api_key)


planets = [
    {"name": "Mercury", "texture": "https://threejs.org/examples/textures/planets/mercury_1024.jpg"},
    {"name": "Venus", "texture": "https://threejs.org/examples/textures/planets/venus_surface_1024.jpg"},
    {"name": "Earth", "texture": "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"},
    {"name": "Mars", "texture": "https://threejs.org/examples/textures/planets/mars_1024.jpg"},
    {"name": "Jupiter", "texture": "https://threejs.org/examples/textures/planets/jupiter_1024.jpg"},
    {"name": "Saturn", "texture": "https://threejs.org/examples/textures/planets/saturn_1024.jpg"},
    {"name": "Uranus", "texture": "https://threejs.org/examples/textures/planets/uranus_1024.jpg"},
    {"name": "Neptune", "texture": "https://threejs.org/examples/textures/planets/neptune_1024.jpg"},
    {"name": "Pluto", "texture": "https://threejs.org/examples/textures/planets/pluto_1024.jpg"}
]


@app.route('/api/chat', methods=['GET','POST'])
def get_planets():
    print("In")
    data =  request.get_json()
    print(data)
    question = data.get('question')  # Default question if none provided
    print(question)
    planet = data.get('planet')  # Default question if none provided
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a helpful teacher speaking to children teaching them about the solar system and specifically about {planet}."},
            {"role": "user", "content": question}
        ]
    )
    completion_text = completion.choices[0].message.content
    return jsonify({'generated_text': completion_text})

if __name__ == '__main__':
    app.run(debug=True)
