function add (complex1, complex2) {
    return {
        real: complex1.real + complex2.real,
        imag: complex1.imag + complex2.imag
    };

}

function sub (complex1, complex2) {
    return {
        real: complex1.real - complex2.real,
        imag: complex1.imag - complex2.imag
    };
    
}

function mul (complex1, complex2) {
    return {
        real: complex1.real * complex2.real - complex1.imag * complex2.imag,
        imag: complex1.real * complex2.imag + complex1.imag * complex2.real
    };
    
}

function div (complex1, complex2) {
    const denominator = complex2.real * complex2.real + complex2.imag * complex2.imag;
    return {
        real: (complex1.real * complex2.real + complex1.imag * complex2.imag) / denominator,
        imag: (complex1.imag * complex2.real - complex1.real * complex2.imag) / denominator
    };
    
}

const complex1 = {real: 1, imag: 2};
const complex2 = {real: 3, imag: 4};

//動作確認
console.log('Addition:', add(complex1, complex2));
console.log('Subtraction:', sub(complex1, complex2));
console.log('Multiplication:', mul(complex1, complex2));
console.log('Division:', div(complex1, complex2));