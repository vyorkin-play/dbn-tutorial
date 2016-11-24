start = letters:('a' / 'b')+ { return R.countBy(R.toLower)(letters); }
