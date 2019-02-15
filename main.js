//jshint esnext: true
"use strict";

var fs = require('fs');
var exp = fs.readFileSync(process.argv[2], 'UTF-8');
var wstream = fs.createWriteStream(process.argv[3], 'UTF-8');
var wstream_var = fs.createWriteStream(process.argv[3] + '.variables.json', 'UTF-8');

exp = JSON.parse(exp);

var symbol_table = [];
symbol_table = exp.symbol;

var ast = {};
ast = exp.ast;

var registers = {};
for(let i = 2; i < 64; i++){
	registers['r' + i] = 'empty';
}

var label_nr = -1;
function nextLabel(){
	label_nr++;
	return 'next_' + label_nr;
}

var endif_nr = - 1;
function nextEndif(){
	endif_nr++;
	return 'endif_' + endif_nr;
}

var for_nr = - 1;
function nextFor(){
	for_nr++;
	return 'for_' + for_nr;
}

var endfor_nr = - 1;
function nextEndfor(){
	endfor_nr++;
	return 'endfor_' + endfor_nr;
}

var repeat_nr = - 1;
function nextRepeat(){
	repeat_nr++;
	return 'repeat_' + repeat_nr;
}

var while_nr = - 1;
function nextWhile(){
	while_nr++;
	return 'while_' + while_nr;
}

var endwhile_nr = - 1;
function nextEndwhile(){
	endwhile_nr++;
	return 'endwhile_' + endwhile_nr;
}

//var else_nr = if_nr;
//function nextElse(){
	//else_nr++;
	//return 'else_' + else_nr;
//}

var structSize = {};
for(let i in symbol_table[0].types){
	let size = 0;
	structSize[i] = {};
	if(symbol_table[0].types[i].type === 'array'){
		structSize[i].elements_size = getSize(symbol_table[0].types[i].elements_type);
		structSize[i].nr_of_elements = symbol_table[0].types[i].to - symbol_table[0].types[i].from + 1;
	}
	else{
		for(let j in symbol_table[0].types[i].elements){
			if(symbol_table[0].types[i].elements[j].type !== 'string'){
				size = 4;
			}
			else{
				size = 256;
			}
			structSize[i][symbol_table[0].types[i].elements[j].id] = size;
		}
	}
}

var address = 0;
var variables = [];
variables.push({});
for(let i = 0; i < Object.keys(symbol_table[0].variables).length; i++){
	let variable = Object.keys(symbol_table[0].variables)[i];
	variables[0][variable] = address;
	if(i !== Object.keys(symbol_table[0].variables).length - 1){
		address += getSize(symbol_table[0].variables[variable].type);
	}

	/*
	if(structSize.hasOwnProperty(symbol_table[0].variables[i].type)){
		if(structSize[symbol_table[0].variables[i].type].hasOwnProperty('elements_size')){
			address += getArraySize(symbol_table[0].variables[i].type);
		}
		else{
			address += getStructSize(structSize[symbol_table[0].variables[i].type]);
		}
	}
	else if(symbol_table[0].variables[i].type === 'string'){
		address += 256;
	}
	else{
		address += 4;
	}
	*/
}

function getSize(type){
	if(/int|real|logic|symbol/.test(type)){
		return 4;
	}
	else if(type === 'string'){
		return 256;
	}
	else if(structSize[type] && structSize[type].nr_of_elements){
		return getArraySize(type);
	}
	else{
		return getStructSize(type);
	}
}

function getStructSize(struct){
	var size = 0;
	for(let i in structSize[struct]){
		size += structSize[struct][i];
	}
	return size;
}

function getArraySize(array){
	var size = structSize[array].elements_size * structSize[array].nr_of_elements;
	return size;
}

function getFirstEmptyRegister(){
	for(let i in registers){
		if(registers[i] === 'empty'){
			return i;
		}
	}
}

function operatorToInstruction(op){
	switch(op){
		case '+':
			return 'add';
		case '-':
			return 'sub';
		case '*':
			return 'mul';
		case '/':
			return 'div';
		case '=':
			return 'je';
		case '!=':
			return 'jne';
		case '>=':
			return 'jge';
		case '<=':
			return 'jle';
		case '>':
			return 'jg';
		case '<':
			return 'jl';
		case 'AND':
		case 'OR':
		case 'XOR':
		case 'mod':
			return op.toLowerCase();
	}
}

function getAsmValue(value, type){
	if(type === 'real'){
		return value * 1000;
	}
	else if(type === 'logic'){
		if(value === true){
			return 1;
		}
		else{
			return 0;
		}
	}
	else if(type === 'symbol'){
		return "'" + value + "'";
	}
	else{
		return value;
	}
}

//var used_registers = [];
function asm(node){
	if(node.type === 'script'){
		wstream.write('start:\n');
		for(let i in node.statements){
			asm(node.statements[i]);
		}
		wstream.write('\tstop\n');
	}
	else if(node.type === 'define'){
		let register;
		for(let i in node.elements){
			if(node.elements[i].value){
				if(node.elements[i].value.type !== 'value'){
					register = asm(node.elements[i].value);
					registers[register] = register;
				}
				else{
					register = getFirstEmptyRegister();
					wstream.write('\tset ' + register + ' ' + getAsmValue(node.elements[i].value.value, node.elements[i].value.t) + '\n');
					registers[register] = getAsmValue(node.elements[i].value.value, node.elements[i].value.t);
				}
			let register_address = getFirstEmptyRegister();
			wstream.write('\tset ' + register_address + ' ' + variables[node.elements[i].symbol][node.elements[i].id] + '\n');
			wstream.write('\tstore ' + register_address + ' ' + register + '\n');
			registers[register] = 'empty';
			}
		}
	}
	else if(node.type === 'element_of_struct'){
		var struct = node.struct.t;
		var element = node.element;
		var size = 0;

		for(let i in structSize[struct]){
			if(i !== element){
				size += structSize[struct][i];
			}
			else{
				break;
			}
		}
		
		let register_address_value = variables[node.struct.symbol][node.struct.value];
		let register_address = getFirstEmptyRegister();
		wstream.write('\tset ' + register_address + ' ' + register_address_value + '\n');
		registers[register_address] = register_address_value;

		let register = getFirstEmptyRegister();
		wstream.write('\tset ' + register + ' ' + size + '\n');
		registers[register] = size;

		wstream.write('\tadd ' + register + ' ' + register_address + ' ' + register + '\n');
		registers[register_address] = 'empty';
		return register;
	}
	else if(node.type === 'element_of_array'){
		let array = node.array.value;
		let struct = node.array.t;
		let struct_elements_size = structSize[struct].elements_size;
		let array_address = variables[node.array.symbol][array];

		let register_address = getFirstEmptyRegister();
		wstream.write('\tset ' + register_address + ' ' + array_address + '\n');
		registers[register_address] = array_address;

		let register_index;
		if(node.index.type !== 'value'){
			register_index = asm(node.index);
			wstream.write('\tload ' + register_index + ' ' + register_index + '\n');
			registers[register_index] = register_index;
		}
		else{
			register_index = getFirstEmptyRegister();
			wstream.write('\tset ' + register_index + ' ' + node.index.value + '\n');
			registers[register_index] = node.index.value;
		}

		let register_elements_size = getFirstEmptyRegister();
		wstream.write('\tset ' + register_elements_size + ' ' + struct_elements_size + '\n');
		//registers[register_elements_size] = struct_elements_size;

		wstream.write('\tmul ' + register_index + ' ' + register_index + ' ' + register_elements_size + '\n');

		registers[register_address] = 'empty';
		registers[register_index] = 'empty';
		registers[register_elements_size] = 'empty';
		
		let register = getFirstEmptyRegister();
		wstream.write('\tadd ' + register + ' ' + register_address + ' ' + register_index + '\n');
		registers[register] = 'used';

		return register;

	}
	else if(node.type === 'expression'){

		if(node.left && node.right){
			var register_left;
			var register_right;

			if(node.left.type === 'id'){
				register_left = getFirstEmptyRegister();
				wstream.write('\tset ' + register_left + ' ' + variables[node.left.symbol][node.left.value] + '\n');
				if(node.left.symbol !== 0 && !(symbol_table[node.left.symbol].variables[node.left.value])){
					wstream.write('\tadd ' + register_left + ' r0 ' + register_left + '\n');
				}
				wstream.write('\tload ' + register_left + ' ' + register_left + '\n');
				registers[register_left] = 'used';
			}
			else if(node.left.type !== 'value'){
				register_left = asm(node.left);
				registers[register_left] = 'used';
			}

			if(node.right.type === 'id'){
				register_right = getFirstEmptyRegister();
				wstream.write('\tset ' + register_right + ' ' + variables[node.right.symbol][node.right.value] + '\n');
				if(node.right.symbol !== 0 && !(symbol_table[node.right.symbol].variables[node.right.value])){
					wstream.write('\tadd ' + register_right + ' r0 ' + register_right + '\n');
				}
				wstream.write('\tload ' + register_right + ' ' + register_right + '\n');
				registers[register_right] = 'used';
			}
			else if(node.right.type !== 'value'){
				register_right = asm(node.right);
				registers[register_right] = 'used';
			}

			if(!(register_left)){
				register_left = getFirstEmptyRegister();
				wstream.write('\tset ' + register_left + ' ' + getAsmValue(node.left.value, node.left.t) + '\n');
				registers[register_left] = node.left.value;
			}

			if(!(register_right)){
				register_right = getFirstEmptyRegister();
				wstream.write('\tset ' + register_right + ' ' + getAsmValue(node.right.value, node.right.t) + '\n');
				registers[register_right] = node.right.value;
			}

			if(node.t === 'real' && node.left.t !== 'real'){
				let register_real = getFirstEmptyRegister();
				wstream.write('\tset ' + register_real + ' 1000\n');
				wstream.write('\tmul ' + register_left + ' ' + register_left + ' ' + register_real + '\n');
			}

			if(node.t === 'real' && node.right.t !== 'real'){
				let register_real = getFirstEmptyRegister();
				wstream.write('\tset ' + register_real + ' 1000\n');
				wstream.write('\tmul ' + register_right + ' ' + register_right + ' ' + register_real + '\n');
				registers[register_real] = 'used';
			}

			var register_total = getFirstEmptyRegister();

			var instruction = operatorToInstruction(node.op);
			if(node.t === 'logic'){
				if(/(and|or|xor)/.test(instruction)){
					wstream.write('\t' + instruction + ' ' + register_total + ' ' + register_left + ' ' + register_right + '\n');
					registers[register_total] = 'used';
				}
				else{
					let label = nextLabel();
					wstream.write('\ttest ' + register_left + ' ' + register_right + '\n');
					wstream.write('\tset ' + register_total + ' 1\n');
					wstream.write('\t' + instruction + ' ' + label + '\n');
					wstream.write('\tset ' + register_total + ' 0\n');
					wstream.write(label + ':\n');
				}
			}
			else{
				wstream.write('\t' + instruction + ' ' + register_total + ' ' + register_left + ' ' + register_right + '\n');
				registers[register_total] = register_total;
			}

			registers[register_left] = 'empty';
			registers[register_right] = 'empty';
			registers[register_total] = 'empty'; /////

			return register_total;
		}
		else{
			let register = getFirstEmptyRegister();
			if(node.value.type === 'id'){
				let register_address = variables[node.value.symbol][node.value.value];
				wstream.write('\tset ' + register + ' ' + register_address + '\n');
				wstream.write('\tload ' + register + ' ' + register + '\n');
				registers[register] = 'used';
			}
			if(node.t === 'logic'){
				let register_logic = getFirstEmptyRegister();
				wstream.write('\tset ' + register_logic + ' 0x0000000000000001\n');
				wstream.write('\txor ' + register + ' ' + register + ' ' + register_logic + '\n');
				//registers[register] = 'used';
			}
			return register;
		}
	}
	else if(node.type === 'attribution'){
		let register_value;
		let register;
		let register_address;
		
		if(node.from.type === 'id'){
			let register_value_address = variables[node.from.symbol][node.from.value];
			register_value = getFirstEmptyRegister();
			wstream.write('\tset ' + register_value + ' ' + register_value_address + '\n');
			wstream.write('\tload ' + register_value + ' ' + register_value + '\n');
			registers[register_value] = 'used';
		}
		else if(node.from.type !== 'value'){
			register_value = asm(node.from);
			registers[register_value] = register_value;
		}
		else{
			register_value = getFirstEmptyRegister();
			let value = getAsmValue(node.from.value, node.from.t);
			wstream.write('\tset ' + register_value + ' ' + value + '\n');
			registers[register_value] = value;
		}

		if(node.to.type !== 'value'){
			if(node.to.type === 'id'){
				register_address = variables[node.to.symbol][node.to.value];
			}
			register = asm(node.to);
			registers[register] = register;
		}

		if(!(register)){
			register = getFirstEmptyRegister();
			registers[register] = 'used';
		}
		if(node.to.type !== 'element_of_struct' && node.to.type !== 'element_of_array'){
			wstream.write('\tset ' + register + ' ' + register_address + '\n');
		}

		if(node.to.t === 'symbol' && node.from.t !== 'symbol'){
			let register_symbol = getFirstEmptyRegister();
			wstream.write('\tset ' + register_symbol + ' 0x00000000000000FF\n');
			wstream.write('\tand ' + register_value + ' ' + register_value + ' ' + register_symbol + '\n');
		}
		else if(node.to.t === 'real' && node.from.t !== 'real'){
			let register_real = getFirstEmptyRegister();
			wstream.write('\tset ' + register_real + ' 1000\n');
			wstream.write('\tmul ' + register_value + ' ' + register_value + ' ' + register_real + '\n');
		}

		wstream.write('\tstore ' + register + ' ' + register_value + '\n');
		//registers[register] = register_value;

		registers[register_value] = 'empty';
		registers[register] = 'empty';
	}
	else if(node.type === 'asm'){
		if(node.instruction === 'readnumber'){
			let register;
			let register_address;
			for(let i in node.parameters){

				register = getFirstEmptyRegister();
				wstream.write('\treadnumber ' + register + '\n');
				registers[register] = 'used';

				register_address = getFirstEmptyRegister();
				wstream.write('\tset ' + register_address + ' ' + variables[node.parameters[i].symbol][node.parameters[i].value] + '\n');

				wstream.write('\tstore ' + register_address + ' ' + register + '\n');
				registers[register] = 'empty';
			}
		}
		else if(node.instruction === 'writenumber'){
			let register;
			let register_address;
			for(let i in node.parameters){

				register = getFirstEmptyRegister();
				if(node.parameters[i].type === 'value' || node.parameters[i].type === 'id'){
					register_address = variables[node.parameters[i].symbol][node.parameters[i].value];
					wstream.write('\tset ' + register + ' ' + register_address + '\n');
					wstream.write('\tload ' + register + ' ' + register + '\n');
				}
				else{
					register = asm(node.parameters[i]);
				}
				//if(node.parameters[i].type === 'value'){
					//console.log('\tset ' + register + ' ' + register_address);
					//console.log('\tload ' + register + ' ' + register);
				//}
				wstream.write('\twritenumber ' + register + '\n');
			}
		}
		else if(node.instruction === 'write'){
			let register = getFirstEmptyRegister();
			for(let i in node.parameters){
				if(node.parameters[i].type === 'id'){
					let register_address = variables[node.parameters[i].symbol][node.parameters[i].value];
					wstream.write('\tset ' + register + ' ' + register_address + '\n');
					wstream.write('\tload ' + register + ' ' + register + '\n');
				}
				else{
					register = asm(node.parameters[i]);
				}
				wstream.write('\twrite ' + register + '\n');
			}
		}
		else if(node.instruction === 'pushsp'){
			wstream.write('\tpushsp\n');
		}
		else if(node.instruction === 'pop'){
			for(let i in node.parameters){
				let register = getFirstEmptyRegister();
				wstream.write('\tpop ' + register + '\n');
				registers[register] = 'used';

				let register_address = getFirstEmptyRegister();
				let register_address_value = variables[node.parameters[i].symbol][node.parameters[i].value];
				wstream.write('\tset ' + register_address + ' ' + register_address_value + '\n');
				wstream.write('\tstore ' + register_address + ' ' + register + '\n');

				registers[register] = 'empty';
			}
		}
	}
	else if(node.type === 'if'){
		let register_expression = asm(node.expression);
		registers[register_expression] = 'used';

		var current_if = label_nr;

		let register_comp = getFirstEmptyRegister();
		wstream.write('\tset ' + register_comp + ' 1\n');
		wstream.write('\ttest ' + register_comp + ' ' + register_expression + '\n');
		if(!(node.else)){
			wstream.write('\tjne ' + nextEndif() + '\n');
			endif_nr--;

			for(let i in node.then){
				asm(node.then[i]);
			}
		}

		if(node.else){
			wstream.write('\tjne else_' + label_nr + '\n');
			
			for(let i in node.then){
			//let register_comp = getFirstEmptyRegister();
			//wstream.write('\tset ' + register_comp + ' 1\n');
			//wstream.write('\ttest ' + register_comp + ' ' + register_expression + '\n');
				//wstream.write('\tjne else_' + label_nr + '\n');

				asm(node.then[i]);

				wstream.write('\tjmp ' + nextEndif() + '\n');
				endif_nr--;

				for(let i = 0; i < node.else.length; i++){
					wstream.write('else_' + current_if + ':\n');
					asm(node.else[i]);

					//if(i !== node.else.length - 1){
					//	let register_comp = getFirstEmptyRegister();
					//	wstream.write('\tset ' + register_comp + ' 1\n');
					//	wstream.write('\ttest ' + register_comp + ' ' + register_expression + '\n');
					//	wstream.write('\tjne else_' + (current_if + i) + '\n');
						//registers[register_comp] = 'used';
					//}
				}
			}
			//else{
			//	wstream.write('\tjne ' + nextEndif() + '\n');
			//	endif_nr--;

			//	asm(node.then[i]);	
			//}
			//registers[register_comp] = 'used';
		}

		wstream.write(nextEndif() + ':\n');
		return register_expression;
	}
	else if(node.type === 'for'){
		let register_from = getFirstEmptyRegister();
		if(node.from.type === 'id'){
			let register_from_address = getFirstEmptyRegister();
			wstream.write('\tset ' + register_from_address + ' ' + variables[node.from.symbol][node.from.value] + '\n');
			wstream.write('\tload ' + register_from + ' ' + register_from_address + '\n');
			registers[register_from] = 'used';
		}
		else if(node.from.type !== 'value'){
			register_from = asm(node.from);
		}
		else{
			wstream.write('\tset ' + register_from + ' ' + node.from.value + '\n');
			registers[register_from] = node.from.value;
		}

		let register_to = getFirstEmptyRegister();
		if(node.to.type === 'id'){
			let register_to_address = getFirstEmptyRegister();
			wstream.write('\tset ' + register_to_address + ' ' + variables[node.to.symbol][node.to.value] + '\n');
			wstream.write('\tload ' + register_to + ' ' + register_to_address + '\n');
			registers[register_to] = 'used';
		}
		else if(node.to.type !== 'value'){
			register_to = asm(node.to);
		}
		else{
			wstream.write('\tset ' + register_to + ' ' + node.to.value + '\n');
			registers[register_to] = node.to.value;
		}

		let register_step = getFirstEmptyRegister();
		if(node.step.type === 'id'){
			let register_step_address = getFirstEmptyRegister();
			wstream.write('\tset ' + register_step_address + ' ' + variables[node.step.symbol][node.step.value] + '\n');
			wstream.write('\tload ' + register_step + ' ' + register_step_address + '\n');
			registers[register_step] = 'used';
		}
		else if(node.step.type !== 'value'){
			register_step = asm(node.step);
		}
		else{
			wstream.write('\tset ' + register_step + ' ' + node.step.value + '\n');
			registers[register_step] = node.step.value;
		}

		let register_var = getFirstEmptyRegister();
		let register_var_address = variables[node.symbol][node.variable];
		wstream.write('\tset ' + register_var + ' ' + register_var_address + '\n');
		registers[register_var] = register_var_address;

		let register_var_aux = getFirstEmptyRegister();
		wstream.write('\tmov ' + register_var_aux + ' ' + register_from + '\n');
		registers[register_var_aux] = register_from;

		wstream.write('\tstore ' + register_var + ' ' + register_var_aux + '\n');
		wstream.write(nextFor() + ':\n');
		for_nr--;

		for(let i in node.statements){
			wstream.write('\ttest ' + register_var_aux + ' ' + register_to + '\n');
			if(node.direction === 'to'){
				wstream.write('\tjg ' + nextEndfor() + '\n');
				endfor_nr--;
			}
			else{
				wstream.write('\tjl ' + nextEndfor() + '\n');
				endfor_nr--;
			}
			asm(node.statements[i]);
		}
		if(node.direction === 'to'){
			wstream.write('\tadd ' + register_var_aux + ' ' + register_var_aux + ' ' + register_step + '\n');
		}
		else{
			wstream.write('\tsub ' + register_var_aux + ' ' + register_var_aux + ' ' + register_step + '\n');
		}
		wstream.write('\tstore ' + register_var + ' ' + register_var_aux + '\n');
		wstream.write('\tjmp ' + nextFor() + '\n');
		wstream.write(nextEndfor() + ':\n');
	}
	else if(node.type === 'repeat'){
		wstream.write(nextRepeat() + ':\n');
		repeat_nr--;

		for(let i in node.statements){
			asm(node.statements[i]);
		}

		let register_expression = asm(node.expression);
		let register_comp = getFirstEmptyRegister();
		wstream.write('\tset ' + register_comp + ' 1\n');
		wstream.write('\ttest ' + register_comp + ' ' + register_expression + '\n');
		wstream.write('\tje ' + nextRepeat() + '\n');
	}
	else if(node.type === 'while'){
		wstream.write(nextWhile() + ':\n');
		while_nr--;
		let register_expression = asm(node.expression);

		let register_comp = getFirstEmptyRegister();
		wstream.write('\tset ' + register_comp + ' 1\n');
		wstream.write('\ttest ' + register_comp + ' ' + register_expression + '\n');
		wstream.write('\tjne ' + nextEndwhile() + '\n');
		endwhile_nr--;

		for(let i in node.statements){
			asm(node.statements[i]);
		}

		wstream.write('\tjmp ' + nextWhile() + '\n');
		wstream.write(nextEndwhile() + ':\n');
	}
	else if(node.type === 'valueof'){
		for(let i in registers){
			if(registers[i] !== 'empty'){
				wstream.write('\tpush ' + i + '\n');
			}
		}
		let register_param = getFirstEmptyRegister();
		for(let i in node.parameters){
			if(node.parameters[i].type === 'id'){
				wstream.write('\tset ' + register_param + ' ' + variables[node.parameters[i].symbol][i] + '\n');
				wstream.write('\tload ' + register_param + ' ' + register_param + '\n');
			}
			else if(node.parameters[i].type !== 'value'){
				register_param = asm(node.parameters[i]);
			}
			else{
				wstream.write('\tset ' + register_param + ' ' + node.parameters[i].value + '\n');
			}
			wstream.write('\tpush ' + register_param + '\n');
		}

		let function_name = node.function.id;
		wstream.write('\trun ' + function_name + '\n');

		let register_sp_address = getFirstEmptyRegister();
		wstream.write('\tset ' + register_sp_address + ' ' + (address + 4) + '\n');
		registers[register_sp_address] = 'used';

		wstream.write('\tpushsp\n');

		let register_sp = getFirstEmptyRegister();
		wstream.write('\tpop ' + register_sp + '\n');
		wstream.write('\tadd ' + register_sp + ' ' + register_sp + ' ' + register_sp_address + '\n');
		wstream.write('\tpush ' + register_sp +'\n');
		registers[register_sp] = 'used';
		wstream.write('\tpopsp\n');

		registers[register_sp_address] = 'empty';
		registers[register_sp] = 'empty';
		for(let i = Object.keys(registers).length - 1; i >= 0; i--){
			if(registers[Object.keys(registers)[i]] !== 'empty'){
				wstream.write('\tpop ' + Object.keys(registers)[i] + '\n');
			}
		}

		wstream.write('\tmov ' + register_sp_address + ' r1\n');

		return register_sp_address;
	}
	else if(node.type === 'value_of_function'){
		let register;
		if(node.value.type === 'id'){
			register = getFirstEmptyRegister();
			wstream.write('\tset ' + register + ' ' + variables[node.value.symbol][node.value.value] + '\n');
			wstream.write('\tload ' + register + ' ' + register + '\n');
		}
		else if(node.value.type !== 'value'){
			register = asm(node.value);
		}
		else{
			register = getFirstEmptyRegister();
			wstream.write('\tset ' + register + ' ' + node.value.value + '\n');
		}

		wstream.write('\tpush r0\n');
		wstream.write('\tpopsp\n');
		wstream.write('\tpop r0\n');

		wstream.write('\tmov r1 ' + register + '\n');
		wstream.write('\tret\n');

		return register;
	}
}

asm(ast);

for(let i in symbol_table[0].functions){
	let function_name = i;
	let nr_of_param = symbol_table[0].functions[i].parameters.length;
	let symbol = symbol_table[0].functions[i].symbol;

	if(!(variables[symbol])){
		variables.push({});
	}

	var function_address = 0;
	for(let j = 0; j < Object.keys(symbol_table[symbol].variables).length; j++){
		let local_var = Object.keys(symbol_table[symbol].variables)[j];
		variables[symbol][local_var] = function_address;
		if(j !== Object.keys(symbol_table[symbol].variables).length - 1){
			function_address += getSize(symbol_table[symbol].variables[local_var].type);
		}
	}

	let function_address_param = function_address;
	for(let j in symbol_table[0].functions[i].parameters){
		let param = symbol_table[0].functions[i].parameters[j].id;
		variables[symbol][param] = function_address_param + 8;
		function_address_param += getSize(symbol_table[0].functions[i].parameters[j].type);
	}

	wstream.write(function_name + ':\n');
	wstream.write('\tpush r0\n');
	wstream.write('\tpushsp\n');
	wstream.write('\tpop r0\n');

	let register_address = getFirstEmptyRegister();
	wstream.write('\tset ' + register_address + ' ' + function_address + '\n');
	wstream.write('\tsub ' + register_address + ' r0 ' + register_address + ' \n');
	wstream.write('\tpush ' + register_address + '\n');
	wstream.write('\tpopsp\n');
	registers[register_address] = 'used';

	for(let j in symbol_table[0].functions[i].statements){
		asm(symbol_table[0].functions[i].statements[j]);
	}
	registers[register_address] = 'empty';

	wstream.write('\tpush r0\n');
	wstream.write('\tpopsp\n');
	wstream.write('\tpop r0\n');
	wstream.write('\tret\n');
}

try{
	wstream_var.write(JSON.stringify(variables, null, 4));
}catch(e){
	console.error(e);
}