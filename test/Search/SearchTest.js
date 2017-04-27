import Mocha, {
    describe,
    it
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import {
    Search
} from '../../src/Search/Search.js';

describe('Class Search: Basic tests: ', () => {
        let search = new Search();
        it('Search constructor works', function(done)  {
            expect(search).to.be.instanceof(Object);
            done();
        });
    }),

    describe('Class Search: Method fuzzySearch functionality tests: ', () => {
        let search = new Search();
        let text1 = "Der Audi gefällt mir.";
        let text2 = "Die Bayerische Motoren Werke sind eine AG";
        let searchTerm = "BMW"

        it('false test', function(done) {
            expect(search.fuzzySearch(text1, searchTerm)).equal(false);
            done();
        });

        it('true test', function(done) {
            expect(search.fuzzySearch(text2, searchTerm)).equal(true);
            done();
        });

        it('missing searchTerm test', function(done) {
            expect(search.fuzzySearch(text1, null)).equal(false);
            done();
        });

        it('missing context test', function(done) {
            expect(search.fuzzySearch(null, searchTerm)).equal(false);
            done();
        });

        it('missing arguments test', function(done) {
            expect(search.fuzzySearch(null, null)).equal(false);
            done();
        });
    });

describe('Class Search: Methode search tests: ', () => {
    let search = new Search();
    let searchTerm = "Haus21";
    let searchTermUnits = "Grad"
    let dataArray = [{
        "description": "Haus21",
        "name": "Haus21 Temperatur",
        "unitOfMeasurement": {
            "name": "Grad Celsius",
            "symbol": "°"
        }
    }];

    it('basic function test', function(done)  {
        let res = search.search(dataArray, searchTerm, false);
        expect(res[0].name).equal("Haus21 Temperatur");
        done();
    });

    it('only units function test', function(done)  {
        let res = search.search(dataArray, searchTerm, true);
        expect(res.length).equal(0);
        done();
    });

    it('only units function test 2', function(done)  {
        let res = search.search(dataArray, searchTermUnits, true);
        expect(res[0].unitOfMeasurement.name).equal("Grad Celsius");
        done();
    });

    it('result type test', function(done)  {
        let res = search.search(dataArray, searchTerm, false);
        expect(res).instanceof(Array);
        done();
    });

    it('missing onlyUnit flag test', function(done)  {
        let res = search.search(dataArray, searchTerm);
        expect(res.length).equal(1);
        done();
    });

    it('missing serachTerm or missing dataArray test', function(done)  {
        let res = search.search(dataArray, false);
        expect(res.length).equal(0);
        done();
    });

    it('missing serachTerm and missing dataArray test', function(done)  {
        let res = search.search(false);
        expect(res.length).equal(0);
        done();
    });

    it('missing arguments test', function(done)  {
        let res = search.search();
        expect(res.length).equal(0);
        done();
    });
});