var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "p4ygwthc7nk6rqxt",
  publicKey: "gt55pfgg4sgxvyht",
  privateKey: "0368f6b529f73555371643324f5f8a0d"
});

exports.getToken = (req,res) =>{
    gateway.clientToken.generate({}, function (err, response) {

        if(err){
            res.status(500).send(err);
        }
        else{
            // console.log("Line 17...  ",response);
            res.send(response);
        }
      });
};

exports.processPayment = (req,res) =>{

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).send(err);
          }
          else{
            // console.log("Line 39...  ",result);
              res.send(result);
          }
      });
};