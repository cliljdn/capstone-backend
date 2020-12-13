<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const Accounts = require('../../../database/Model/account_table.model')
const TravelHistory = require('../../../database/Model/TravelHistory.model')
const Companions = require('../../../database/Model/Companion_Table.model')
const EmployeeProfile = require('../../../database/Model/EmployeeProfile.model')
=======
const express = require("express");
const router = express.Router();
const Accounts = require("../../../database/Model/account_table.model");
const TravelHistory = require("../../../database/Model/TravelHistory.model");
const Companions = require("../../../database/Model/Companion_Table.model");
const EmployeeProfile = require("../../../database/Model/EmployeeProfile.model");
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
const {
	registerValidation,
	loginValidation,
	companionEmailValidate,
<<<<<<< HEAD
} = require('../../Validations/Accounts/AccountValidation')
const bcrypt = require('bcrypt')
const { transporter, sendMail } = require('../../mailer/MailerConfig')
const jwt = require('../../Tokens/jwt')
const Establishments = require('../../../database/Model/Establishments.model')
const { establishments } = require('../../contants/TableNames')
const UserProfile = require('../../../database/Model/UserProfile.model')

// accounts login
router.post('/accounts/login', async (req, res, next) => {
	const { email, password } = req.body
=======
} = require("../../Validations/Accounts/AccountValidation");
const bcrypt = require("bcrypt");
const { transporter, sendMail } = require("../../mailer/MailerConfig");
const jwt = require("../../Tokens/jwt");
const Establishments = require("../../../database/Model/Establishments.model");
const { establishments } = require("../../contants/TableNames");
const UserProfile = require("../../../database/Model/UserProfile.model");

// accounts login
router.post("/accounts/login", async (req, res, next) => {
	const { email, password } = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
	try {
		const reqBody = {
			email: email,
			password: password,
<<<<<<< HEAD
		}
		const validateData = await loginValidation.validate(reqBody, {
			abortEarly: false,
		})

		const checkedData = await Accounts.query().findOne({ email: reqBody.email })
		if (checkedData === undefined) {
			const error = new Error('Email is not registered')
			throw error
		}
		if (checkedData.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
=======
		};
		const validateData = await loginValidation.validate(reqBody, {
			abortEarly: false,
		});

		const checkedData = await Accounts.query().findOne({
			email: reqBody.email,
		});
		if (checkedData === undefined) {
			const error = new Error("Email is not registered");
			throw error;
		}
		if (checkedData.isActive === 0) {
			const error = new Error("Account is not yet verified");
			throw error;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		}

		const checkPass = await bcrypt.compareSync(
			reqBody.password,
			checkedData.password
<<<<<<< HEAD
		)
		if (!checkPass) {
			const error = new Error('Wrong Password')
			throw error
		}

		const token = await jwt.sign({ id: checkedData.account_id })
=======
		);
		if (!checkPass) {
			const error = new Error("Wrong Password");
			throw error;
		}

		const token = await jwt.sign({ id: checkedData.account_id });
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		if (checkedData && checkPass) {
			res.status(201).json({
				account_type: checkedData.account_type,
				auth: true,
				token: token,
<<<<<<< HEAD
			})
		}
	} catch (error) {
		next(error)
	}
})

// accounts register
router.post('/accounts/register', async (req, res, next) => {
	const { email, password, accountType } = req.body
=======
			});
		}
	} catch (error) {
		next(error);
	}
});

// accounts register
router.post("/accounts/register", async (req, res, next) => {
	const { email, password, accountType } = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
	try {
		const accountData = {
			email: email,
			password: password,
			account_type: accountType,
<<<<<<< HEAD
		}

		const validateEntry = await registerValidation.validate(accountData, {
			abortEarly: false,
		})

		const checkIfExist = await Accounts.query().findOne({
			email: accountData.email,
		})

		if (checkIfExist) {
			const error = new Error('Email is already Registered')
			throw error
		}

		const hash = await bcrypt.hashSync(accountData.password, 10)
=======
		};

		const validateEntry = await registerValidation.validate(accountData, {
			abortEarly: false,
		});

		const checkIfExist = await Accounts.query().findOne({
			email: accountData.email,
		});

		if (checkIfExist) {
			const error = new Error("Email is already Registered");
			throw error;
		}

		const hash = await bcrypt.hashSync(accountData.password, 10);
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		if (hash) {
			const insertedData = await Accounts.query().insert({
				email: accountData.email,
				password: hash,
				account_type: accountData.account_type,
				isActive: false,
<<<<<<< HEAD
			})
			// creates a token for the user
			const token = await jwt.sign({ id: insertedData.account_id })
			// anchor tag for email
			const emailLink = `<a href="http://192.168.1.11:8080/accounts/verify/${token}" > Click to verify </a>`
=======
			});
			// creates a token for the user
			const token = await jwt.sign({ id: insertedData.account_id });
			// anchor tag for email
			const emailLink = `<a href="http://192.168.100.90:8080/accounts/verify/${token}" > Click to verify </a>`;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
			// mail credentials
			const mailOptions = {
				from: process.env.MAIL_USER,
				to: insertedData.email,
<<<<<<< HEAD
				subject: 'Verify Email',
				text: 'ScanGapo 2020',
				html: emailLink,
			}
=======
				subject: "Verify Email",
				text: "ScanGapo 2020",
				html: emailLink,
			};
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
			//sends email for registered accounts
			transporter.sendMail(mailOptions, (error, info) => {
				return error
					? console.error(error)
<<<<<<< HEAD
					: console.log(`Email sent: ${info.response}`)
			})
=======
					: console.log(`Email sent: ${info.response}`);
			});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

			if (insertedData) {
				res.status(200).json({
					created: true,
<<<<<<< HEAD
					message: 'registered',
				})
			}
		}
	} catch (error) {
		next(error)
	}
})

// create profile for regitered accounts.
router.post('/accounts/create/profile', async (req, res, next) => {
=======
					message: "registered",
				});
			}
		}
	} catch (error) {
		next(error);
	}
});

// create profile for regitered accounts.
router.post("/accounts/create/profile", async (req, res, next) => {
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
	const {
		firstName,
		lastName,
		middleName,
<<<<<<< HEAD
		age,
		contact,
		image,
		position,
	} = req.body
=======
		birthday,
		contact,
		image,
		position,
	} = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

	try {
		const dataBody = {
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
<<<<<<< HEAD
			age: age,
			contactnumber: contact,
			image: image,
			position: position,
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		const findAccount = await Accounts.query().findById(decoded.id)
		if (findAccount.account_type === 'User') {
			await findAccount
				.$relatedQuery('UserProfile')
=======
			birthday: birthday,
			contactnumber: contact,
			image: image,
			position: position,
		};

		const auth = req.headers["authorization"];
		if (!auth) {
			const error = new Error("No token provided");
			throw error;
		}

		const decoded = await jwt.verify(auth);
		if (!decoded) {
			const error = new Error("Invalid token");
			throw error;
		}

		const findAccount = await Accounts.query().findById(decoded.id);
		if (findAccount.account_type === "User") {
			await findAccount
				.$relatedQuery("UserProfile")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
				.for(findAccount.account_id)
				.insert({
					firstname: dataBody.firstname,
					lastname: dataBody.lastname,
					middlename: dataBody.middlename,
<<<<<<< HEAD
					age: dataBody.age,
=======
					birthday: dataBody.birthday,
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					contactnumber: dataBody.contactnumber,
					image: dataBody.image,
				})
				.then(() => {
					res.status(201).json({
						created: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		} else if (findAccount.account_type === 'Driver') {
			await findAccount
				.$relatedQuery('UserProfile')
=======
						message: "Success",
					});
				});
		} else if (findAccount.account_type === "Driver") {
			await findAccount
				.$relatedQuery("UserProfile")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
				.for(findAccount.account_id)
				.insert({
					firstname: dataBody.firstname,
					lastname: dataBody.lastname,
					middlename: dataBody.middlename,
<<<<<<< HEAD
					age: dataBody.age,
=======
					birthday: dataBody.birthday,
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					contactnumber: dataBody.contactnumber,
					image: dataBody.image,
					isDriver: true,
				})
				.then(() => {
					res.status(201).json({
						created: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		} else if (findAccount.account_type === 'Employee') {
			await findAccount
				.$relatedQuery('EmployeeProfile')
=======
						message: "Success",
					});
				});
		} else if (findAccount.account_type === "Employee") {
			await findAccount
				.$relatedQuery("EmployeeProfile")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
				.for(findAccount.account_id)
				.insert({
					firstname: dataBody.firstname,
					lastname: dataBody.lastname,
					middlename: dataBody.middlename,
<<<<<<< HEAD
					age: dataBody.age,
=======
					birthday: dataBody.birthday,
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					contactnumber: dataBody.contactnumber,
					position: dataBody.position,
					image: dataBody.image,
					working_in: null,
				})
				.then(() => {
					res.status(201).json({
						created: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})

// updates the profile
router.patch('/accounts/update/profile', async (req, res, next) => {
=======
						message: "Success",
					});
				});
		}
	} catch (error) {
		next(error);
	}
});

// updates the profile
router.patch("/accounts/update/profile", async (req, res, next) => {
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
	const {
		firstName,
		lastName,
		middleName,
		age,
		contact,
		image,
		position,
<<<<<<< HEAD
	} = req.body
=======
	} = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

	try {
		const dataBody = {
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			age: age,
			contactnumber: contact,
			image: image,
			position: position,
<<<<<<< HEAD
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		const findAccount = await Accounts.query().findById(decoded.id)
		if (
			findAccount.account_type === 'User' ||
			findAccount.account_type === 'Driver'
		) {
			await findAccount
				.$relatedQuery('UserProfile')
=======
		};

		const auth = req.headers["authorization"];
		if (!auth) {
			const error = new Error("No token provided");
			throw error;
		}

		const decoded = await jwt.verify(auth);
		if (!decoded) {
			const error = new Error("Invalid token");
			throw error;
		}

		const findAccount = await Accounts.query().findById(decoded.id);
		if (
			findAccount.account_type === "User" ||
			findAccount.account_type === "Driver"
		) {
			await findAccount
				.$relatedQuery("UserProfile")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
				.for(findAccount.account_id)
				.patch({
					firstname: dataBody.firstname,
					lastname: dataBody.lastname,
					middlename: dataBody.middlename,
					age: dataBody.age,
					contactnumber: dataBody.contactnumber,
					image: dataBody.image,
				})
				.then(() => {
					res.status(201).json({
						updated: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		} else if (findAccount.account_type === 'Employee') {
			await findAccount
				.$relatedQuery('EmployeeProfile')
=======
						message: "Success",
					});
				});
		} else if (findAccount.account_type === "Employee") {
			await findAccount
				.$relatedQuery("EmployeeProfile")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
				.for(findAccount.account_id)
				.patch({
					firstname: dataBody.firstname,
					lastname: dataBody.lastname,
					middlename: dataBody.middlename,
					age: dataBody.age,
					contactnumber: dataBody.contactnumber,
					position: dataBody.position,
					image: dataBody.image,
				})
				.then(() => {
					res.status(201).json({
						updated: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})

const fillArray = require('../../../database/Controllers/UserController')
// create for travel history
router.post('/accounts/create/travel', async (req, res, next) => {
	const { destination, accEmail } = req.body
=======
						message: "Success",
					});
				});
		}
	} catch (error) {
		next(error);
	}
});

const fillArray = require("../../../database/Controllers/UserController");
// create for travel history
router.post("/accounts/create/travel", async (req, res, next) => {
	const { destination, accEmail } = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

	try {
		// AccEmail must be an array
		const travelLog = {
			location: destination,
			email: accEmail,
<<<<<<< HEAD
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const accountId = []
		const thisParent = []
		const check = []
		const decoded = await jwt.verify(auth)
		const parentId = await Accounts.query().findById(decoded.id)
		const profile = await parentId.$relatedQuery('UserProfile')
		if (!profile) {
			const error = new Error('Account has no profile')
			throw error
		}
		let dummy = false
		if (travelLog.email === undefined || travelLog.email.length === 0) {
			if (parentId.account_type === 'Employee') {
				const error = new Error(`Invalid account type for ${parentId.email}`)
				throw error
			}

			//inserts to travel history to parent
			const checkIfEmail = await Accounts.query().findByIds(check)
			const companion = await UserProfile.query().findByIds(accountId)
			for (const users of checkIfEmail) {
				if (users.account_type === 'Employee') {
					const error = new Error(`invalid account type for ${users.email}`)
					throw error
				}
			}
			const fetchParentTravel = await profile
				.$relatedQuery('TravelHistory')
				.insertAndFetch({
					destination: travelLog.location,
					isCompanion: false,
				})

			const companionsTravel = []
			//inserts parentId to companions and inserts companions to travel table
			for (const account of companion) {
				const insertTravelCompanion = await account
					.$relatedQuery('TravelHistory')
					.insertAndFetch({
						destination: travelLog.location,
						isCompanion: true,
					})
				companionsTravel.push(
					fillArray(insertTravelCompanion.travel_id, travelLog.email.length)
				)
				const insertToCompanion = await profile
					.$relatedQuery('GetCompanions')
					.insertGraphAndFetch({
						users_id: account.user_id,
						travel_id: fetchParentTravel.travel_id,
					})
=======
		};

		const auth = req.headers["authorization"];
		if (!auth) {
			const error = new Error("No token provided");
			throw error;
		}

		const accountId = [];
		const thisParent = [];
		const check = [];
		const decoded = await jwt.verify(auth);
		const parentId = await Accounts.query().findById(decoded.id);
		const profile = await parentId.$relatedQuery("UserProfile");
		if (!profile) {
			const error = new Error("Account has no profile");
			throw error;
		}
		let dummy = false;

		if (travelLog.email === undefined || travelLog.email.length === 0) {
			if (parentId.account_type === "Employee") {
				const error = new Error(`Invalid account type for ${parentId.email}`);
				throw error;
			}

			//inserts to travel history to parent
			const checkIfEmail = await Accounts.query().findByIds(check);
			const companion = await UserProfile.query().findByIds(accountId);
			for (const users of checkIfEmail) {
				if (users.account_type === "Employee") {
					const error = new Error(`invalid account type for ${users.email}`);
					throw error;
				}
			}
			const fetchParentTravel = await profile
				.$relatedQuery("TravelHistory")
				.insertAndFetch({
					destination: travelLog.location,
					isCompanion: false,
				});

			const companionsTravel = [];
			//inserts parentId to companions and inserts companions to travel table
			for (const account of companion) {
				const insertTravelCompanion = await account
					.$relatedQuery("TravelHistory")
					.insertAndFetch({
						destination: travelLog.location,
						isCompanion: true,
					});
				companionsTravel.push(
					fillArray(insertTravelCompanion.travel_id, travelLog.email.length)
				);
				const insertToCompanion = await profile
					.$relatedQuery("GetCompanions")
					.insertGraphAndFetch({
						users_id: account.user_id,
						travel_id: fetchParentTravel.travel_id,
					});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
			}

			// inserts the users who they go with
			const data = await Companions.query().insertGraph({
				parent_id: profile.user_id,
				users_id: null,
				travel_id: fetchParentTravel.travel_id,
<<<<<<< HEAD
			})
=======
			});

			res.status(201).json(fetchParentTravel);
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		} else {
			for (let i = 0; i < travelLog.email.length; i++) {
				await companionEmailValidate.validate(
					{ email: travelLog.email[i] },
					{
						abortEarly: false,
					}
<<<<<<< HEAD
				)
				const ifExist = await Accounts.query().findOne({
					email: travelLog.email[i],
				})
=======
				);
				const ifExist = await Accounts.query().findOne({
					email: travelLog.email[i],
				});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

				if (!ifExist) {
					const error = new Error(
						`this email does not exist ${travelLog.email[i]}`
<<<<<<< HEAD
					)
					throw error
				}
				const comProfile = await Accounts.relatedQuery('UserProfile').for(
					ifExist.account_id
				)
				accountId.push(comProfile[0].user_id)
				check.push(ifExist.account_id)
				thisParent.push(
					fillArray(comProfile[0].user_id, travelLog.email.length)
				)
				if (comProfile[0].user_id === profile.user_id) {
					const error = new Error('Cannot add yourself to companions')
					throw error
				}
			}

			if (parentId.account_type === 'Employee') {
				const error = new Error(`Invalid account type for ${parentId.email}`)
				throw error
			}

			//inserts to travel history to parent
			const checkIfEmail = await Accounts.query().findByIds(check)
			const companion = await UserProfile.query().findByIds(accountId)
			for (const users of checkIfEmail) {
				if (users.account_type === 'Employee') {
					const error = new Error(`invalid account type for ${users.email}`)
					throw error
				}
			}
			const fetchParentTravel = await profile
				.$relatedQuery('TravelHistory')
				.insertAndFetch({
					destination: travelLog.location,
					isCompanion: false,
				})

			const companionsTravel = []
			//inserts parentId to companions and inserts companions to travel table
			for (const account of companion) {
				const insertTravelCompanion = await account
					.$relatedQuery('TravelHistory')
=======
					);
					throw error;
				}
				const comProfile = await Accounts.relatedQuery("UserProfile").for(
					ifExist.account_id
				);
				accountId.push(comProfile[0].user_id);
				check.push(ifExist.account_id);
				thisParent.push(
					fillArray(comProfile[0].user_id, travelLog.email.length)
				);
				if (comProfile[0].user_id === profile.user_id) {
					const error = new Error("Cannot add yourself to companions");
					throw error;
				}
			}

			if (parentId.account_type === "Employee") {
				const error = new Error(`Invalid account type for ${parentId.email}`);
				throw error;
			}

			//inserts to travel history to parent
			const checkIfEmail = await Accounts.query().findByIds(check);
			const companion = await UserProfile.query().findByIds(accountId);
			for (const users of checkIfEmail) {
				if (users.account_type === "Employee") {
					const error = new Error(`invalid account type for ${users.email}`);
					throw error;
				}
			}
			const fetchParentTravel = await profile
				.$relatedQuery("TravelHistory")
				.insertAndFetch({
					destination: travelLog.location,
					isCompanion: false,
				});

			const companionsTravel = [];
			//inserts parentId to companions and inserts companions to travel table
			for (const account of companion) {
				const insertTravelCompanion = await account
					.$relatedQuery("TravelHistory")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

					.insertAndFetch({
						destination: travelLog.location,
						isCompanion: true,
<<<<<<< HEAD
					})
				companionsTravel.push(
					fillArray(insertTravelCompanion.travel_id, travelLog.email.length)
				)
				const insertToCompanion = await profile
					.$relatedQuery('GetCompanions')
=======
					});
				companionsTravel.push(
					fillArray(insertTravelCompanion.travel_id, travelLog.email.length)
				);
				const insertToCompanion = await profile
					.$relatedQuery("GetCompanions")
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

					.insertGraphAndFetch({
						users_id: account.user_id,
						travel_id: fetchParentTravel.travel_id,
<<<<<<< HEAD
					})
			}

			// inserts the users who they go with
			accountId.push(profile.user_id)
			for (let i = 0; i < thisParent.length; i++) {
				for (let j = 0; j < thisParent[i].length; j++) {
					accountId.push(accountId.shift())
=======
					});
			}

			// inserts the users who they go with
			accountId.push(profile.user_id);
			for (let i = 0; i < thisParent.length; i++) {
				for (let j = 0; j < thisParent[i].length; j++) {
					accountId.push(accountId.shift());
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					if (accountId[i] !== thisParent[i][j]) {
						await Companions.query().insertGraph({
							parent_id: thisParent[i][j],
							users_id: accountId[i],
							travel_id: companionsTravel[i][j],
<<<<<<< HEAD
						})
					} else {
						accountId.push(accountId.shift())
=======
						});
					} else {
						accountId.push(accountId.shift());
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
						await Companions.query().insertGraph({
							parent_id: thisParent[i][j],
							users_id: accountId[i],
							travel_id: companionsTravel[i][j],
<<<<<<< HEAD
						})
=======
						});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					}
				}
			}

<<<<<<< HEAD
			res.status(201).json(fetchParentTravel)
		}
	} catch (error) {
		next(error)
		console.error(error)
	}
})

//update account
router.patch('/update/account', async (req, res, next) => {
	const { email, password } = req.body
=======
			res.status(201).json(fetchParentTravel);
		}
	} catch (error) {
		next(error);
		console.error(error);
	}
});

//update account
router.patch("/update/account", async (req, res, next) => {
	const { email, password } = req.body;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
	try {
		const reqBody = {
			email: email,
			password: password,
<<<<<<< HEAD
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const checkAcc = await Accounts.query().findById(decoded.id)
		if (checkAcc === undefined) {
			const error = new Error('No such Account')
			throw error
		}

		if (reqBody.password !== undefined) {
			const hash = await bcrypt.hashSync(reqBody.password, 10)
=======
		};

		const auth = req.headers["authorization"];
		if (!auth) {
			const error = new Error("No token provided");
			throw error;
		}

		const decoded = await jwt.verify(auth);
		if (!decoded) {
			const error = new Error("Invalid Token");
			throw error;
		}

		const checkAcc = await Accounts.query().findById(decoded.id);
		if (checkAcc === undefined) {
			const error = new Error("No such Account");
			throw error;
		}

		if (reqBody.password !== undefined) {
			const hash = await bcrypt.hashSync(reqBody.password, 10);
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
			await Accounts.query()
				.findById(checkAcc.account_id)
				.patch({
					password: hash,
				})
				.then(() => {
					res.status(201).json({
						updated: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
=======
						message: "Success",
					});
				});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		} else {
			await Accounts.query()
				.findById(checkAcc.account_id)
				.patch({
					email: reqBody.email,
				})
				.then(() => {
					res.status(201).json({
						updated: true,
<<<<<<< HEAD
						message: 'Success',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})

// verification for account
router.get('/accounts/verify/:token', async (req, res, next) => {
	const { token } = req.params
	try {
		const decoded = await jwt.verify(token)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const checkAcc = await Accounts.query().findById(decoded.id)
		if (checkAcc === undefined) {
			const error = new Error('No such user')
			throw error
		}
		if (checkAcc.isActive === 1) {
			const error = new Error('Account is already Verified')
			throw error
=======
						message: "Success",
					});
				});
		}
	} catch (error) {
		next(error);
	}
});

// verification for account
router.get("/accounts/verify/:token", async (req, res, next) => {
	const { token } = req.params;
	try {
		const decoded = await jwt.verify(token);
		if (!decoded) {
			const error = new Error("Invalid Token");
			throw error;
		}

		const checkAcc = await Accounts.query().findById(decoded.id);
		if (checkAcc === undefined) {
			const error = new Error("No such user");
			throw error;
		}
		if (checkAcc.isActive === 1) {
			const error = new Error("Account is already Verified");
			throw error;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		}

		if (checkAcc) {
			const activatedAcc = await checkAcc.$query().patch({
				isActive: true,
<<<<<<< HEAD
			})
=======
			});
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
			res.status(200).json({
				email: checkAcc.email,
				account_type: checkAcc.account_type,
				verified: true,
<<<<<<< HEAD
				message: 'verified',
			})
		}
	} catch (error) {
		next(error)
	}
})

// post request for employee working in
router.post('/account/establishment/create', async (req, res, next) => {
	const { establishment_id } = req.body
	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		const findEmployee = await Accounts.query().findById(decoded.id)
		const empProfile = await EmployeeProfile.query().where(
			'profile_owner',
			findEmployee.account_id
		)

		if (findEmployee === undefined || empProfile === undefined) {
			const error = new Error('Cannot find profile')
			throw error
		}
		if (findEmployee.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		const estData = await Establishments.query().findById(establishment_id)
		if (estData === undefined) {
			const error = new Error('Establishment does not exist')
			throw error
		}
		if (estData.isActive === 0) {
			const error = new Error('Establishment is not yet verified')
			throw error
=======
				message: "verified",
			});
		}
	} catch (error) {
		next(error);
	}
});

// post request for employee working in
router.post("/account/establishment/create", async (req, res, next) => {
	const { establishment_id } = req.body;
	try {
		const auth = req.headers["authorization"];
		if (!auth) {
			const error = new Error("No token provided");
			throw error;
		}

		const decoded = await jwt.verify(auth);
		if (!decoded) {
			const error = new Error("Invalid token");
			throw error;
		}

		const findEmployee = await Accounts.query().findById(decoded.id);
		const empProfile = await EmployeeProfile.query().where(
			"profile_owner",
			findEmployee.account_id
		);

		if (findEmployee === undefined || empProfile === undefined) {
			const error = new Error("Cannot find profile");
			throw error;
		}
		if (findEmployee.isActive === 0) {
			const error = new Error("Account is not yet verified");
			throw error;
		}

		const estData = await Establishments.query().findById(establishment_id);
		if (estData === undefined) {
			const error = new Error("Establishment does not exist");
			throw error;
		}
		if (estData.isActive === 0) {
			const error = new Error("Establishment is not yet verified");
			throw error;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
		}

		const thisProfile = await empProfile[0]
			.$query()
			.patchAndFetch({
				working_in: estData.establishment_id,
			})
			.then(() => {
				res.status(201).json({
					updated: true,
<<<<<<< HEAD
					message: 'Successfully inserted work info',
				})
			})
	} catch (error) {
		next(error)
	}
})

module.exports = router
=======
					message: "Successfully inserted work info",
				});
			});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
