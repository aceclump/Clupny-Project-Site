import sys 


#cssFile = open("css/"+sys.argv[1]+".scss", "w")
#cssFile1920 = open("css/1920px/_"+sys.argv[1]+".scss", "w")
#cssFile1024 = open("css/1024px/_"+sys.argv[1]+".scss", "w")
#cssFile640 = open("css/640px/_"+sys.argv[1]+".scss", "w")
#cssFile0 = open("css/0-640px/_"+sys.argv[1]+".scss", "w")

#MAIN COMPONENT JS FILE

componentFile = open(sys.argv[1]+".js", "w")

componentFile.write("import React from 'react';\n")
componentFile.write("import './css/"+sys.argv[1]+".scss';\n\n")
if (sys.argv[2] == "true"):
    componentFile.write("class "+sys.argv[1]+" extends React.Component {\n")
    componentFile.write("\tconstructor(props) {\n\t\t")
    componentFile.write("super(props)\n\n\t}\n\n\t")
    componentFile.write("render() {\n\n\t\treturn (\n\t\t\t")
    componentFile.write("<div className=\""+sys.argv[1]+"\">\n\n\t\t\t</div>\n")
    componentFile.write("\t\t);\n")
    componentFile.write("\t}")
else:
    componentFile.write("function "+sys.argv[1]+"(props) {\n")
    componentFile.write("\treturn (\n\t\t")
    componentFile.write("<div className=\""+sys.argv[1]+"\">\n\n\t\t</div>\n\t")
    componentFile.write(");")
componentFile.write("\n}\n\nexport default "+sys.argv[1])

componentFile.close()

#MAIN CSS FILE

cssFile = open("css/"+sys.argv[1]+".scss", "w")

cssFile.write("@use '../../css/mainVars.scss' as main;\n")
cssFile.write("@use '1920px/"+sys.argv[1]+".scss' as b1920;\n")
cssFile.write("@use '1024px/"+sys.argv[1]+".scss' as b1024;\n")
cssFile.write("@use '640px/"+sys.argv[1]+".scss' as b640;\n")
cssFile.write("@use '0-640px/"+sys.argv[1]+".scss' as b0;\n")

cssFile.close()

#CSS FILE IMPORTS FOR BREAKPOINTS

cssImportFiles = []
cssImportFiles += [open("css/1920px/_"+sys.argv[1]+".scss", "w")]
cssImportFiles += [open("css/1024px/_"+sys.argv[1]+".scss", "w")]
cssImportFiles += [open("css/640px/_"+sys.argv[1]+".scss", "w")]
cssImportFiles += [open("css/0-640px/_"+sys.argv[1]+".scss", "w")]

def writeToAll(text):
    for file in cssImportFiles:
        file.write(text)

writeToAll("@use '../../../css/mainVars' as main;\n\n")
writeToAll("@media")
cssImportFiles[0].write("(min-width: main.$breakLargeMin)")
cssImportFiles[1].write("(min-width: main.$breakMediumMin) and (max-width: main.$breakLargeMin - 1)")
cssImportFiles[2].write("(min-width: main.$breakSmallMin) and (max-width: main.$breakMediumMin - 1)")
cssImportFiles[3].write("(max-width: main.$breakSmallMin - 1)")
writeToAll(" {\n\n}")

