var expect = require("chai").expect
var chaiHttp = require ("chai-http")
var chai = require ("chai")

chai.use(chaiHttp);

describe("API endpoint", function() {
    var host = "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default"
    var path = "/exercise_api"

    describe("GET Method", function () {
        it("Positive case", function (done) {
            chai
                .request(host)
                .get(path)
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });
    });

    describe("PUT Method", function () {
        it("Positive case with new entity added", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                            value: 1000})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with null value", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "2000",
                            value: null})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200)
                    done();
                });
        });

        it("Positive case with special characters in main key", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "!@#$%^&*()_+3000",
                            value:"12"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200)
                    done();
                });
        });

        it("Positive case with non valid json _BUT_ with unexpected 200", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "4000",
                            value:"12",
                            excess: "2141"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200)
                    done();
                });
        });

        it("Negative case with null main key value", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: null,
                    value: "110"})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'list\' object has no attribute \'get\'")
                    done();
                });
        });

        it("Negative case with existing main key", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                    value: "110"})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("value already exist")
                    done();
                });
        });

        it("Negative case with empty body", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'main_key\'")
                    done();
                });
        });

        it("Negative case with wrong main key type", function (done) {
            chai
                .request(host)
                .put(path)
                .set('Content-Type', 'application/json')
                .send({main_key: 7000,
                    value: "10"})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'NoneType\' object has no attribute \'get\'")
                    done();
                });
        });
    });

    describe("POST Method", function () {
        it("Positive case with updated value", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                    value: "1002"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with non valid Json _BUT_ with unexpected 200", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                    value: "1002",
                    exess: "12"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with wrong value type _BUT_ unexpected 200", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                    value: 1002})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with null value", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000",
                    value: null})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200)
                    done();
                });
        });

        it("Positive case with special characters in main key", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "!@#$%^&*()_+3000",
                    value:"12"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200)
                    done();
                });
        });

        it("Negative case with non existent main key", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: 'nonexist',
                    value: '1000'})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("value dose not exist") // <- typo
                    done()
                });
        });

        it("Negative case with null main key value", function (done) {
            chai
                .request(host)
                .post(path)
                .send({main_key: null,
                    value:"12"})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'list\' object has no attribute \'get\'")
                    done();
                });
        });

        it("Negative case with empty body", function (done) {
            chai
                .request(host)
                .post(path)
                .send({})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'main_key\'")
                    done();
                });
        });

        it("Negative case with wrong main key type", function (done) {
            chai
                .request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({main_key: 7000,
                    value: "10"})
                .end((err, res) => {
                    expect(err.statusCode).to.be.eq(400)
                    expect(err.rawResponse).to.be.eq("\'NoneType\' object has no attribute \'get\'")
                    done();
                });
        });
    });

    describe("DELETE Method", function () {
        it("Positive case with main key deleted successfully", function (done) {
            chai
                .request(host)
                .delete(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "1000"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with non existent main key", function (done) {
            chai
                .request(host)
                .delete(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "12"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with wrong main key type", function (done) {
            chai
                .request(host)
                .delete(path)
                .set('Content-Type', 'application/json')
                .send({main_key: 12})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Positive case with special characters in main key", function (done) {
            chai
                .request(host)
                .delete(path)
                .set('Content-Type', 'application/json')
                .send({main_key: "!@#$%^&*()12"})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });

        it("Negative case with null main key value _BUT_ with unexpected 200", function (done) {
            chai
                .request(host)
                .delete(path)
                .set('Content-Type', 'application/json')
                .send({main_key: null})
                .end((err, res) => {
                    expect(res.status).to.be.eq(200);
                    done();
                });
        });
    });
});
