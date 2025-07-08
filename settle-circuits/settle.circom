pragma circom 2.0.0;

include "node_modules/circomlib/circuits/comparators.circom";
include "node_modules/circomlib/circuits/poseidon.circom";

template SettleMinOutProof(n) {
    // Private inputs
    signal input minOut;
    signal input salt;

    // Public inputs
    signal input realOut;
    signal input commitment; // Poseidon is typically represented with two field elements

    // both 64 bits integers
    component poseidonCommitment = Poseidon(2);
    poseidonCommitment.inputs[0] <== minOut;
    poseidonCommitment.inputs[1] <== salt;

    poseidonCommitment.out === commitment;

    // Check minOut <= realOut
    component isLessEq = LessEqThan(n);
    isLessEq.in[0] <== minOut;
    isLessEq.in[1] <== realOut;
    isLessEq.out === 1;
}

component main {public [realOut, commitment]} = SettleMinOutProof(64); // assuming 64 bits integers