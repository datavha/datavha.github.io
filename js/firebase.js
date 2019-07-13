const firebaseConfig = {
	apiKey: "AIzaSyBU_jxXUNqfGZGIsStStgHkN4KCXkKcZyI",
	authDomain: "machine-learning-xp.firebaseapp.com",
	databaseURL: "https://machine-learning-xp.firebaseio.com",
	projectId: "machine-learning-xp",
	storageBucket: "machine-learning-xp.appspot.com",
	messagingSenderId: "263528128860",
	appId: "1:263528128860:web:a7a5356f2517a0a3"
};

firebase.initializeApp(firebaseConfig);

$("#form").on("submit", function(e) {
	e.preventDefault();
	const nome = $("#nome").val();
	const email = $("#email").val();

	submitPessoa({ nome, email })
		.then(() =>
			alert("Parabéns, em alguns dias entraremos em contato com você!")
		)
		.catch(err => {
			alert("Falha ao enviar e-mail");
		});
});

$("#subscribeform").on("submit", function(e) {
	e.preventDefault();
	const email = $("#subscribeemail").val();

	submitPessoa({ nome: null, email })
		.then(() => alert("Você está inscrito em nossa lista de e-mails!"))
		.catch(err => {
			alert("Falha ao enviar e-mail");
		});
});

function submitPessoa({ nome, email }) {
	return new Promise(function(resolve, reject) {
		const database = firebase.database();
		const key = database.ref("pessoas").push().key;

		database.ref("pessoas/" + key).set(
			{
				nome: nome,
				email: email
			},
			function(error) {
				if (error) {
					console.log(error);
					return reject();
				} else {
					return resolve();
				}
			}
		);
	});
}
