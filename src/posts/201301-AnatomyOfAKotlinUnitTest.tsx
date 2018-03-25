import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Anatomy of a Kotlin Unit Test</PostTitleH1>
            <div>
                The Kotlin documentation on unit testing is available on the wiki under{' '}
                <a href="http://confluence.jetbrains.net/display/Kotlin/Annotations">annotations</a>.
                In the spirit of Test Driven Development, finding out how to set up and run Kotlin tests
                was just about the first thing that I wanted to know when I started using the language.
            The following is a quick guide to unit testing using Kotlin.<br />
                <br />
                Fortunately, Kotlin testing is much the same as Java Testing. IntelliJ currently
                supports running Kotlin JUnit tests much the same way it does Java Unit Tests.
                You can write the tests using the old JUnit 3 way by extending TestCase or the
            new JUnit 4 way of using Test Annotations. The following is an example of both of these:<br />
                <br />
                <KotlinCode>{`package org.example

import org.junit.Test
import junit.framework.TestCase
import kotlin.test.*
import org.junit.After
import org.junit.Before

/**
 * JUnit 3 Test Case
 */
public class JUnit3StringTest : TestCase() {

    // override keyword required to override the setUp method
    protected override fun setUp() {
        // set up the test case
    }

    // override keyword required to override the tearDown method
    protected override fun tearDown() {
        // tear down the test case
    }

    fun testCapitalize() {
        // assertEquals comes from kotlin.test.*
        assertEquals("Hello world!", "hello world!".capitalize())
    }
}

/**
 * JUnit 4 Test Case
 */
public class JUnit4StringTest {

    Before fun setUp() {
        // set up the test case
    }

    After fun tearDown() {
        // tear down the test case
    }

    Test fun testCapitalize() {
        // assertEquals comes from kotlin.test.*
        assertEquals("Hello world!", "hello world!".capitalize())
    }
}
`}
                </KotlinCode>
                <br />
                In theory, TestNG should also work but it doesn't look like the TestNG-J
                plugin recognises Kotlin TestNG test cases. A Kotlin TestNG test case
                would look as follows:
                <KotlinCode>{`import kotlin.test.*
import org.testng.annotations.*

/**
 * TestNG Test Case
 */
public class TestNGStringTest {

    BeforeTest fun setUp() {
        // set up the test case
    }

    AfterTest fun tearDown() {
        // tear down the test case
    }

    Test(groups=array("fast")) fun testCapitalize() {
        assertEquals("Hello world!", "hello world!".capitalize())
    }
}
`}
                </KotlinCode>
                <br />
                For further inspiration, there are a lot of examples of test cases to be found
            in the <a href="https://github.com/JetBrains/kotlin/tree/master/libraries/stdlib/test">stdlib source code</a>.
      </div>
        </PostArticle>
    </PostDiv>
))
