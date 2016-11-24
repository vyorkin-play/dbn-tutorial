Start = _ commands:Command* _ { return commands; }

Command
  = name:Identifier __ args:(__ Value)* _ {
    return {
      type: 'Command',
      name: name.toLowerCase(),
      args: args ? args.map(a => a[1]) : null,
    };
  }

Variable = value:Identifier {
  return {
    type: 'String',
    value
  };
}

Integer = ('0' / NonZeroDigit Digit*) {
  return {
    type: 'Integer',
    value: parseInt(text(), 10)
  };
}

Point = '[' __ x:Value __ y:Value __ ']' {
  return {
    type: 'Point',
    x,
    y,
  };
}

Special = '<' __ head:Variable tail:(__ Value)+ __ '>' {
  return {
    type: 'Special',
    args: [head, tail.map(a => a[1])],
  };
}

Value = Variable / Integer / Additive / Point / Special

Additive
  = lhs:Multiplicative __ sign:AdditiveSign __ rhs:Additive {
    return {
      type: 'Command',
      name: sign,
      args: [lhs, rhs],
    };
  }
  / Multiplicative

Multiplicative
  = lhs:Primary __ sign:MultiplicativeSign __ rhs:Multiplicative {
      return {
        type: 'Command',
        name: sign,
        args: [lhs, rhs],
      };
    }
  / Primary

Primary
  = (Variable / Integer / Special)
  / '(' additive:Additive ')' {
    return additive;
  }

Identifier 'identifier' = head:IdentifierStart tail:IdentifierPart* {
  return head + tail.join('');
}
IdentifierStart = AsciiLetter / '_' / '$'
IdentifierPart = IdentifierStart / Digit

AdditiveSign = [+-]
MultiplicativeSign = [*/]
AsciiLetter = [a-zA-Z]
Digit = [0-9]
NonZeroDigit = [1-9]

_ = (WhiteSpace / LineTerminatorSequence / Comment)*
__ = WhiteSpace*

Comment 'comment'
  = '//' (!LineTerminator SourceCharacter)*

SourceCharacter = .

WhiteSpace 'whitespace'
  = ' '
  / '\t'     // tab
  / '\v'     // vertical tab
  / '\f'     // form feed
  / '\u00A0' // no-break space
  / '\uFEFF' // zero width no-break space

LineTerminator = [\n\r\u2028\u2029]

LineTerminatorSequence 'end of line'
  = '\n'
  / '\r\n'
  / '\r'
  / '\u2028' // line separator
  / '\u2029' // paragraph separator
  / Zs       // other invisible space/separator shit

// separator, space
Zs = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
