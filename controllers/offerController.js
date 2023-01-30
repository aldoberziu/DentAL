const Trip = require('./../models/tripModel');
const Clinic = require('./../models/clinicModel');
const Service = require('./../models/serviceModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOneOffer = catchAsync(async (req, res, next) => {
  if (req.params.id == 'offer-1') {
    const trip = await Trip.findById('62fe13a5cba5dd07449aa821');
    const clinic = await Clinic.findById('62f6414531c6012fd40be044');
    const filter = { clinic: clinic };
    function random_item(services) {
      return services[Math.floor(Math.random() * services.length)];
    }
    const services = await Service.find(filter);
    console.log(random_item(services).price);
    const normalPrice = random_item(services).price + trip.price;
    const price = normalPrice - normalPrice / 10;
    res.status(200).json({
      status: 'success',
      offer: {
        trip,
        clinic,
        price,
      },
    });
  } else if (req.params.id == 'offer-2') {
    const trip = await Trip.findById('62fe14b0cba5dd07449aa828');
    const clinic = await Clinic.findById('63315893ef62f42fc45260b1');
    const filter = { clinic: clinic };
    function random_item(services) {
      return services[Math.floor(Math.random() * services.length)];
    }
    const services = await Service.find(filter);
    console.log(random_item(services).price);
    const normalPrice = random_item(services).price + trip.price;
    const price = normalPrice - normalPrice / 10;
    res.status(200).json({
      status: 'success',
      offer: {
        trip,
        clinic,
        price,
      },
    });
  } else if (req.params.id == 'offer-3') {
    const trip = await Trip.findById('62fe13a5cba5dd07449aa821');
    const clinic = await Clinic.findById('62f6426331c6012fd40be04c');
    const filter = { clinic: clinic };
    //per secilen service on services bej 10% zbritje
    const services = await Service.find(filter);
    let servicesArray = [];
    servicesArray.push(services);
    console.log(servicesArray)
    function discount(servicesArray) {
      for(let i = 0; i < servicesArray.length; i++){
        return servicesArray[i].price = servicesArray[i].price - (servicesArray[i].price/10);
      }
    }
    // console.log(random_item(services).price);
    const price = servicesArray.forEach(discount);
    // const price = discount(services);
    console.log(price);
    // const normalPrice = random_item(services).price + trip.price;
    // const price = normalPrice - normalPrice / 10;
    res.status(200).json({
      status: 'success',
      offer: {
        trip,
        clinic,
        price,
      },
    });
  } else if (req.params.id == 'offer-4') {
    const trip = await Trip.findById('62fe14b0cba5dd07449aa828');
    const clinic = await Clinic.findById('6367ec1ca0bfaf07008cd1dd');
    const filter = { clinic: clinic };
    function random_item(services) {
      return services[Math.floor(Math.random() * services.length)];
    }
    const services = await Service.find(filter);
    console.log(random_item(services).price);
    const normalPrice = random_item(services).price + trip.price;
    const price = normalPrice - normalPrice / 10;
    res.status(200).json({
      status: 'success',
      offer: {
        trip,
        clinic,
        price,
      },
    });
  }
  next();
});
exports.getAllOffers = catchAsync(async (req, res, next) => {
  const trip1 = await Trip.findById('62fe13a5cba5dd07449aa821');
  const clinic1 = await Clinic.findById('62f6414531c6012fd40be044');

  const trip2 = await Trip.findById('62fe14b0cba5dd07449aa828');
  const clinic2 = await Clinic.findById('63315893ef62f42fc45260b1');

  const trip3 = await Trip.findById('62fe13a5cba5dd07449aa821');
  const clinic3 = await Clinic.findById('62f6426331c6012fd40be04c');

  const trip4 = await Trip.findById('62fe14b0cba5dd07449aa828');
  const clinic4 = await Clinic.findById('6367ec1ca0bfaf07008cd1dd');

  const offers = [
    [trip1, clinic1],
    [trip2, clinic2],
    [trip3, clinic3],
    [trip4, clinic4],
  ];

  if (!trip1 || !trip2 || !trip3 || !trip4)
    console.log('The trip requested is no longer available');
  if (!clinic1 || !clinic2 || !clinic3 || !clinic4)
    console.log('The clinic requested is no longer available');
  res.status(200).render('cards', {
    title: 'Oferta',
    offers,
  });
  next();
});
