const assert = require("assert");
import testBitton from '../skills/proverkaKnopki.js'
describe("test for addelement", () => {
    it("test 1", () => {
      assert.equal(testBitton(new KeyboardEvent('keydown',{key:'1'})), 'AttackByFireball');
    });
});

