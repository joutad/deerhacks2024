from flask import Flask, jsonify, request, render_template
from config import API_KEY #API KEY - USE YOUR OWN USING A FILE CALLED 'config.py'
import cohere

app = Flask(__name__)

co = cohere.Client(API_KEY) # This is your trial API key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_sentence', methods=['GET'])
def generate_sentence():
    response = co.generate(
    model='command',
    prompt='I want to create a basic language game in English, for kindergarteners to elementary school students. The gist of it will be that a random but coherent sentence with a maximum of 15 words will be generated, with a few words blanked out, and after each blank, mention what kind of word would fit in the blank (noun, verb, adverb, etc.), in parenthesis. Please, only generate the sentence, don\'t write any code for me. Please keep the number of blanks to 1 or 2, and you don\'t need to force a different kind of word for each blank, as in, it is alright if the blanks are two nouns or whatever. Please, don\'t offer any explanations or anything, I strictly only need the generated sentence, that\'s it.',
    max_tokens=58,
    temperature=0.6,
    k=0,
    stop_sequences=["."],
    return_likelihoods='NONE')
    
    # print('Prediction: {}'.format(response.generations[0].text))
    prediction_text = response.generations[0].text

    # Return the prediction text as JSON
    return jsonify({'prediction_text': prediction_text})

if __name__ == '__main__':
    app.run(debug=True)
    