interface String {
  toCamelCase(): string;
  toSnakeCase(): string;
  extractValue(): string;
  toFakeId(): string;
  toNumber(): number;
}

String.prototype.toCamelCase = function() {
  return this.toLowerCase().replace(/ (.)/g, (match, firstLetter) => {
    return firstLetter.toUpperCase();
  });
};

String.prototype.toSnakeCase = function() {
  return this.replace(/ (.)|[A-Z]/g, function(capitalLetter: string, firstLetter: string) {
    var letter = firstLetter || capitalLetter.toLowerCase();
    return '-' + letter;
  });
};

String.prototype.extractValue = function() {
  return this.replace(/ /g, '');
};

String.prototype.toFakeId = function() {
  var fakeId = '';
  for (var i = 0; i < this.length; i++) {
    fakeId += this[i] + (i + 1);
  }
  return fakeId;
};

String.prototype.toNumber = function() {
  return parseInt(this, 10);
};

interface JQuery {
  scope: any;
}
