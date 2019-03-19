# Description:
this is a test application of two validator APIs: 'superstruct' and 'yup'

# RUNNING THE APPLICATUION
navigat to the application folde on the terminal.
type:
```shell
now && now alias
```
if this does not work you'll need to type the two commands onde after the othder:
```shell
now
```
```shell
now alias
```

# Testing
There four testing json files inside the validator. Two are for testing superstruct (success and failure) and the rest are for testing yup (also success and failure).

## Testing superstruct

### success

After running the application, and while still in the application folder, run the command:

```shell
http POST https://wmdd-anderson-validator.now.sh/superstruct < test1.json
```

it should return the json file structure you just sent (a dnd character sheet).

### failure

After running the application, and while still in the application folder, run the command:

```shell
http POST https://wmdd-anderson-validator.now.sh/superstruct < test2.json
```

## Testing Yup

### success

After running the application, and while still in the application folder, run the command:

```shell
http POST https://wmdd-anderson-validator.now.sh/yup < test3.json
```

it should return the json file structure you just sent (a World of Darkness character sheet).

### failure

After running the application, and while still in the application folder, run the command:

```shell
http POST https://wmdd-anderson-validator.now.sh/yup < test4.json
```

it should an error 400 and a description on the error.