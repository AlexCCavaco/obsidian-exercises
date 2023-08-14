# Obsidian Exercises

Obsidian Exercises was developed as an easy way to create exercises within Obsidian. Whether you are preparing for exams, learning a language, refreshing your memory, or any other purpose, you can now create them alongside your notes.

## Select

![Match Exercise](assets/select-exercise.gif)

**Note:** The Options Menu is not showing on the image above.

>$select{"option1", "option2" [, …]}

Select option from a drop list. Options are separated by commas, but consider always using quotations. For multi word values (that contain spaces) they are necessary. Options are **randomized** before being displayed.

To define a **correct options** you can simply prepend the option with an asterisk (for example: \*"option").

Example — $select{"option1", \*"option2", "option3", "option4"}

In the example above there are 4 options and option 2 is the correct one.

You can define **multiple correct options** and they will all be evaluated. When revealing options, the first in the list will be the one shown.

## Input

![Match Exercise](assets/input-exercise.gif)

>$input{"option1", "option2" [, …]}

Input Text into a textbox. The options are evaluated as they are written. You can write **one or more options**, they will all be evaluated, but only the first is shown on reveal.

Example — $input("Correct Text.")

In the example above the correct input is "Correct Text.".

## Line

>$line{"option1", "option2" [, …]}

Line is a wider version of input.

## Match

![Match Exercise](assets/match-exercise.gif)

>$match{"option1"=>"value1", "option2"=>"value2" [, …]}

Match values from two columns. The matches are defined with "=>" and separated by commas. These values will be **randomized** before being displayed.

<a href='https://ko-fi.com/Z8Z4O0JJS' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
