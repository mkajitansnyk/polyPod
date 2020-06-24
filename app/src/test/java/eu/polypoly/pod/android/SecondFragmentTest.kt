package eu.polypoly.pod.android

import androidx.fragment.app.testing.launchFragmentInContainer
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.doesNotExist
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.espresso.web.assertion.WebViewAssertions.webMatches
import androidx.test.espresso.web.sugar.Web.onWebView
import androidx.test.espresso.web.webdriver.DriverAtoms.*
import androidx.test.espresso.web.webdriver.Locator
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import org.hamcrest.CoreMatchers.containsString
import org.junit.Ignore
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.LooperMode

/**
 * This test should be on-par with SecondFragmentInstrumentedTest class.
 * The idea is to have ideally identical tests running both on emulator/device and in Robolectric environment.
 * It merely shows a technical possibility. In the end Robolectric is more meant to aid during unit testing whereas
 * instrumented tests are full-fledged integration tests. For example, as seen below, Robolectric doesn't seem to handle WebViews.
 */
@LooperMode(LooperMode.Mode.PAUSED)
@RunWith(AndroidJUnit4::class)
class SecondFragmentTest {

    @get:Rule
    val activityRule = ActivityTestRule(MainActivity::class.java)

    @Test
    fun firstFragmentIsShown() {
        onView(withText("Hello first fragment"))
            .check(matches(isDisplayed()))
    }

    @Test
    fun canNavigateToSecondFragment() {
        onView(withText("Hello first fragment"))
            .check(matches(isDisplayed()))  // verify I'm starting on first view

        onView(withId(R.id.button_first))
            .perform(click())

        onView(withId(R.id.button_second))
            .check(matches(isDisplayed()))

        onView(withId(R.id.button_first))
            .check(doesNotExist())
    }

    @Ignore("Getting 'java.lang.IllegalStateException: On main thread!', most likely Robolectric doesn't support WebViews, would make sense actually")
    @Test
    fun canFindTextInWebView() {
        launchFragmentInContainer<SecondFragment>()

        onWebView()
            .inWindow(selectFrameByIdOrName("harness"))
            .withElement(findElement(Locator.CLASS_NAME, "helloWorldStyle"))
            .check(webMatches(getText(), containsString("Hello World!")))
    }
}
