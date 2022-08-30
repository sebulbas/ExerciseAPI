# ExerciseAPI
Test exercise for INCOAlliance


Few Notes
1. It would be nice to make tests on bugged functionality fail, but it's hard to assert err when you don't have one. 
So I added "_BUT_ with unexpected code number" to passing test cases that should be red.

2. POST should add new entities and PUT should update them. Not veca versa.

3. GET value by single main_key is missing. With it I could write atleast some variaty of test cases on GET method.

4. Give one endpoint for a multiple people is a nice trolling :). I saw new entities pop up from other people and I don't really wanted to remove them.
Because of that I didn't implement quata test case. I don't wanted to clear the DB as it would affect other people. But I'm aware that real quata limit
is 11 not 10. Not sure if it's a typo in spec or a bug though.
