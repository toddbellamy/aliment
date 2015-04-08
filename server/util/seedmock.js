
exports.getdata = function() {

    var cities = ['Bowmanville','Oshawa', 'Newcastle', 'Courtice'];
    var lastnames = ['Riggs','Alexander','Tate','Skinner','Stevenson','Pope','Patton','Mcclain','Woodard','Day','Gardner','Flowers','Lambert','Love','Nicholson','Mcdonald','Robbins','Thornton','Malone','Tran','Mason','Macias','Buck','Garcia','Foley','Potter','Mora','Gross','Lucero','Glass','Conner','Shepherd','Davies','Preston','Shelton','Hurley','Gregory','Reyes','Bruce','Duarte','Acevedo','Joyce','Suarez','Charles','Lam','Meyer','Cowan','Salazar','Barker','Doyle'];

    var firstnames = ['Ivan','Dania','Perla','Cohen','Brisa','Saniya','Dayana','Alisson','Charles','Ari','Lindsay','Brook','Gideon','Priscilla','Janiah','Kobe','Amari','Jessica','Kenneth','Adriana','Rishi','Collin','Giancarlo','Garrett','Dashawn','Daniela','Rose','Madilynn','Jackson','Tyree','Kaylen','Marvin','Patrick','Mariyah','Brogan','Liliana','Liam'];
    var streets = ['King St.','Queen St.','Jones Ave.','Oak St.','Mill St.','Bloor St.','Adelaide St.','Bond St.','Prestonvale Rd.','Trulls Rd.','Nash Rd.']
    var staff = ['Joan','Bill','Sue','Walt','Mary'];

    var families = [];

    for(ci=0;ci<cities.length;ci++) {
        for(fi=0;fi<lastnames.length;fi++) {
            var lnameindex = getRandomInt(0, lastnames.length-1);
            var streetindex = getRandomInt(0, streets.length-1);
            var streetNumber = getRandomInt(10, 900);
            var regDate = new Date(getRandomInt(2002, 2013), getRandomInt(1,12), getRandomInt(1,27)).toISOString();

            var family = {
                familyStatus: 'Family',
                dateAdded: regDate,
                address1: streetNumber + ' ' + streets[streetindex],
                address2: '',
                city: cities[ci],
                province: 'ON',
                postal: 'L1L 1A1',
                phone1: '905' + getRandomInt(2000000, 9999999),
                totalMonthlyExpenses: getRandomInt(1000, 2000) + (getRandomInt(0, 99) / 10),
                totalMonthlyIncome: getRandomInt(900, 1500) + (getRandomInt(0, 99) / 10),
                proofOfIncomeProvided: true,
                proofOfExpensesProvided: true,
                proofOfAddressProvided: true,
                registeredDate: regDate,
                clientData: [],
                visitData: []
            };

            var lname = lastnames[getRandomInt(0, lastnames.length-1)];
            var clientCount = getRandomInt(1, 6);
            for(cli=0;cli<clientCount;cli++) {
                var client = {
                    firstName: firstnames[getRandomInt(0, firstnames.length-1)],
                    lastName: lname,
                    dateOfBirth: new Date(getRandomInt(1960, 2002), getRandomInt(1,12), getRandomInt(1,27)).toISOString()
                };
                family.clientData.push(client);
            }
            families.push(family);

            var visitCount = getRandomInt(1, 9);
            for(vi=0;vi<=visitCount;vi++) {
                var visit = {
                    date: new Date(getRandomInt(2005, 2014), getRandomInt(1, 12), getRandomInt(1, 27)).toISOString(),
                    value: getRandomInt(7, 14),
                    reusableBagGiven: false,
                    verification: {"userName" : "janes", "firstName" : "Jane", "lastName" : "Smith"},
                    storeVoucher: '',
                    comments: '',
                    foodVoucher: '',
                    approvedBy: null,
                    client: family.clientData[getRandomInt(1, clientCount - 1)]
                }
                family.visitData.push(visit);
            }
        }
    }

    return families;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};

