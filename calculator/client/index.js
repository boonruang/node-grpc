const grpc = require('@grpc/grpc-js')
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb')
const { SumRequest } = require('../proto/sum_pb')

function doSum(client) {
  console.log('doSum was invoked')

  const req = new SumRequest().setFirstNumber(2).setSecondNumber(2)

  client.sum(req, (err, res) => {
    if (err) {
      return console.log(err)
    }

    console.log(`Sum: ${res.getResult()}`)
  })
}

function main() {
  const creds = grpc.ChannelCredentials.createInsecure()
  const client = new CalculatorServiceClient('localhost:50051', creds)

  doSum(client)
  client.close()
}

main()
