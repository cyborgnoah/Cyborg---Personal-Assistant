/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin');
const { dialogflow } = require('actions-on-google')

admin.initializeApp(functions.config().firebase);
const app = dialogflow()

app.intent('Default Welcome Intent', conv => {
  conv.ask('Welcome to my agent!')
})

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand`)
  conv.ask(`I'm sorry, can you try again?`)
})

app.intent('Electricity Units', (conv,{number,date}) => {
  if(number && date)  {
      return admin.database().ref().push().set({Dated:date , Units:number}).then(snapshot => {conv.ask(`Ok Done`)})
                      }
  else {
    {
      conv.ask(`No Parameter found`);
    }
  }
        })

exports.record_electric_costs = functions.https.onRequest(app)
