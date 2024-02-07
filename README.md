![Sequencer - Byte Sequencer Factory](./sequencer_logo.png)

# SEQUENCER

## The Byte Sequencer Factory

Sequencer is a high-tech facility that capitalizes on lost bytes by purchasing lost useless bytes and refining them into usable sequences. Whilst that sounds lovely, it's really just a super simple model of capitalism and commerce as an experiment.

Inspired by [Severance](https://www.imdb.com/title/tt11280740/) and [Decision Problem's Paperclip Game](https://www.decisionproblem.com/paperclips/index2.html), the intention of this project was to explore modelling a game that explores the use of the real environment as factors within the game. Utilising an [Enviro Urban](https://shop.pimoroni.com/products/enviro-urban?variant=40056508219475) Air Quality Monitoring Board, readings are taken every two minutes which update a few of the key metrics of the game - demand, productivity, and raw material prices.

With the recent rise in inflation, concerns about the longevity of the economics system as it current is with the growing concern and impacts of climate change, the intention was to explore a way of seeing these impacts in a more focused, understandable environment. The overall functionality being that the worse the air quality, the harder it is to run a successful factory.

### Measures used

The [Enviro Urban](https://shop.pimoroni.com/products/enviro-urban?variant=40056508219475) board provides readings for temperature, noise, humidity, pressure, and PM1, PM2.5 and PM10 particulate matter. Rather than trying to build all of these in, I decided to focus on the ones considered most problematic - temperature, noise and air pollution.

## How to set it up

If you have your own [Enviro Urban](https://shop.pimoroni.com/products/enviro-urban?variant=40056508219475) board, I'd recommend setting it up to point to a database which stores the values. The game itself will refresh the data every two minutes, but this of course can be customised.

The data from the response should take the following shape:

```json
{
  "id": 2296,
  "uid": "e6616408432aa52e",
  "nickname": "aq-game",
  "model": "urban",
  "timestamp": "2024-02-07T12:48:10.000Z",
  "temperature": 23.25,
  "humidity": 45.08,
  "pressure": 1002.38,
  "noise": 0.023,
  "pm1": 16,
  "pm2_5": 36,
  "pm10": 36
}
```

The key values are pm2_5, pm10, temperature, and timestamp.

This API endpoint should be added under the environment variable `AQ_API_URL=`
