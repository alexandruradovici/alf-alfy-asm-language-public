#!/bin/bash

for folder in verify/alfy/*
do
	for file in $folder/*.asm.variables.json
	do
		rm $file
	done
	for file in $folder/*.asm
	do
		rm $file
	done
	for file in $folder/*.json
	do
		rm $file
	done
done
