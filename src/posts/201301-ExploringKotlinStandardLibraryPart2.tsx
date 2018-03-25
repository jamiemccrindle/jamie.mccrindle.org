import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Exploring the Kotlin Standard Library Part 2</PostTitleH1>
            <div>
                <p>
                    In <a href="http://jamie.mccrindle.org/2013/01/exploring-kotlin-standard-library-part-1.html">Part 1</a>
                    {' '}of this series, I went through the default Kotlin namespace. In Part 2 I'll be going over
                    {' '}<a href="http://jetbrains.github.com/kotlin/versions/snapshot/apidocs/kotlin/io/package-summary.html">kotlin.io</a>.
                </p>
                <p>
                    Most of the public function in kotlin.io are overloaded versions of print and println,
                    which all delegate to System.out.
                </p>
                <p>
                    kotlin.io also introduces readLine for reading lines from stdin and the use method.
                    The use method is a great example of a general purpose extension method. The signature
                    illustrates how to create an extension method that will apply to every class that
                    implements Closeable:
                </p>
                <KotlinCode>{`
public inline fun <T: Closeable, R> T.use(block: (T)-> R) : R
                `.trim()}</KotlinCode>
                <p>
                    The iterate method from the default namespace works very well with the readLine method.
                    A function to count the number of lines from stdin would look as follows:
                </p>
                <KotlinCode>{`
fun main(args: Array<String>) = iterate{ readLine() }.count({ true })
                `.trim()}</KotlinCode>
                <p>
                    The following example uses the 'use' method to read the text from a reader while
                    managing its lifecycle:
                </p>
                <KotlinCode>{`
// gets the contents fo the reader and then closes it
var contents = reader.use { it.readText() }
                `.trim()}</KotlinCode>
                <p>
                    The use method will return whatever the closure returns (in this case, the contents
                    of the reader as a String).
                </p>
                <p>
                    kotlin.io extends java.io.File, java.io.InputStream, java.io.OutputStream, java.io.Reader,
                    java.io.Writer, java.io.BufferedReader and java.net.URL.
                </p>
                <p>
                    For reading files or streams, the API docs distinguish between those methods
                    that can be used on huge amounts of data and those that can't. Those that can't
                    are the ones that wait for the entire file to be read before returning a result
                    e.g. readLines, whereas the those that use a closure or iterator pull
                    data lazily. The following calls should not be used with huge amounts of data
                </p>
                <p>
                    <ul>
                        <li>readBytes</li>
                        <li>readLines</li>
                        <li>readText</li>
                    </ul>
                </p>
                <p>
                    The following can be used for huge amounts of data:
                </p>
                <p>
                    <ul>
                        <li>copyTo</li>
                        <li>forEachBlock</li>
                        <li>forEachLine</li>
                    </ul>
                </p>
                <p>
                    For InputStreams, Readers and Writers, the caller is typically responsible for closing
                    the various streams, the exception being the useLines method.
                </p>
                <p>
                    The Kotlin stdlib enhances with java.io.File with a number of useful methods: copyTo,
                    forEachBlock, forEachLine, isDescendant, listFiles, readBytes, readLines, readText,
                    reader, recurse, relativePath, writeBytes, writeText
                </p>
                <p>
                    The following is an example of copyTo being used:
                </p>
                <KotlinCode>{`
File("/tmp/from.txt").copyTo(File("/tmp/to.txt"))
                `.trim()}</KotlinCode>
                <p>
                    Note the following:
                </p>
                <p>
                    <ul>
                        <li>copyTo only works on files (not directories)</li>
                        <li>copyTo will create the target directory</li>
                        <li>copyTo will overwrite the target file</li>
                        <li>if the source file can't be found a FileNotFoundException will be thrown</li>
                        <li>copyTo will block until the file is written</li>
                    </ul>
                </p>
                <p>
                    As an example, the forEachBlock method could be used to provide a version of copyTo
                    that reports progress as the target file is written as follows:
                </p>
                <KotlinCode>{`
/**
* Copies a file and calls the closure with the current number 
* of bytes read as each block is read
* to indicate progress
*/
public fun File.copyToWithProgress(file: File, closure : (Long) -> Unit) {
    file.directory.mkdirs()
    val output = FileOutputStream(file)
    output.use{
        var length = 0.toLong()
        this.forEachBlock { bytes, size ->
            length += size
            output.write(bytes, 0, size)
            closure(length)
        }
    }
}
                `.trim()}</KotlinCode>
                <p>
                    Here are a few more examples of what can be done with kotlin.io
                </p>
                <KotlinCode>{`
// forEachLine
//
// reads all the lines from a file and prints them out
File("/tmp/from.txt").forEachLine { println(it) }

// isDescendent
//
// Confirms that from.txt is a descendant of /tmp
val isDescendent = File("/tmp/from.txt").isDescendant(File("/tmp"))

// listFiles
//
// Lists all the subdirectories in /tmp
val files = File("/tmp").listFiles{ it.isDirectory() }

// readBytes
//
// reads all the bytes from /tmp/from.bin
val bytes = File("/tmp/from.bin").readBytes()

// readLines
//
// reads all the lines from /tmp/from.txt into a list
// and then runs through each line in the list and prints it out
val lines = File("/tmp/from.txt").readLines()
lines.forEach { println(it) }

// readText
//
// reads all the text from /tmp/from.txt into a string
// and then checks if it contains a multiline string
val text = File("/tmp/from.txt").readText()
val found = text.contains("hello\nworld\n!")

// reader
//
// creates a reader and calls useLines on it
val fileReader = File("/tmp/from.txt").reader().useLines {
    // same as calling forEachLine
}

// recurse
//
// recurse through all the files in /tmp and print out their names
File("/tmp").recurse { println(it.name) }

// relativePath
//
// returns nested/directory/file.txt
File("/tmp").relativePath(File("/tmp/nested/directory/file.txt"))

// writeBytes
//
// write Hello World as bytes to /tmp/helloworld.bin
File("/tmp/helloworld.bin").writeBytes("Hello World!".getBytes())

// writeText
//
// write Hello World as bytes to /tmp/helloworld.txt
File("/tmp/helloworld.txt").writeText("Hello World!")
                    
                `.trim()}</KotlinCode>
            </div>
        </PostArticle>
    </PostDiv>
))
